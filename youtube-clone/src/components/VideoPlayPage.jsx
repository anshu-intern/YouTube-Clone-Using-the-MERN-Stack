import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import userContext from '../assets/utils/userContext';
import like_img from '../assets/icons/like.png';
import dislike_img from '../assets/icons/unlike.png';
import Comment from './Comment';

function VideoPlayPage(){
    const { video_id } = useParams();
    const [ video, setVideo ] = useState({});
    const [ otherVideos, setOtherVideos] = useState([]);
    const { loggedInUser } = useContext(userContext);

    useEffect(()=>{
        async function fetchVideo(){
            try{
                const vid = await axios.get(`http://localhost:3000/api/video/${video_id}`);
                setVideo(vid.data.data);
                console.log(vid.data.data);
            } catch(err){
                console.error(err);
            }
        }
        fetchVideo();
    }, [video_id, loggedInUser]);

    useEffect(()=>{
        async function loadExtra() {
                try{
                    const resp = await axios.get("http://localhost:3000/api/video");
                    setOtherVideos(resp.data.data);
                } catch(err){
                    console.error(err);
                }   
            }
            loadExtra();
    }, [video_id, loggedInUser]);

    function formatViewsIntl(views) {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
        });
        return formatter.format(views) + ' views';
    }

    function uploadDate(date){
        return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    }

    return(
        <>
        <section className="relative h-[100%] w-[100%] flex justify-start items-start gap-5 py-5 px-[30px] overflow-scroll">
            <div className="relative h-[auto] w-3/4 flex flex-col justify-start gap-2 items-start">
                <div className="relative w-[100%] h-[auto] rounded-xl overflow-hidden">
                    <video src={`../../backend/${video.videoUrl}`} controls className="relative w-[100%] h-[auto]"></video>
                </div>

                <span className="font-bold text-[20px]">{video.title}</span>

                <div className="relative w-[100%] h-[auto] flex flex-row justify-between items-end pb-6">
                    <div className="flex flex-row justify-start items-center gap-8">
                        <div className="flex flex-col gap-0">
                            <span className="font-bold text-[14px]">{video.channelId}</span> 
                            <span className="text-gray-500 text-[16px]">774 subscribers</span>
                        </div>
                        <span className="bg-black text-white rounded-3xl px-3 py-2 cursor-pointer text-[14px] font-medium">Subscribe</span>
                    </div>
                    <div className="flex justify-center items-center gap-3 px-2">
                        <div className="relative overflow-hidden flex">
                            <button className="relative h-[100%] border-r border-gray-400 px-6 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tl-3xl rounded-bl-3xl"><div className='flex justify-center items-start gap-1'><img src={like_img}/><span>{video.likes}</span></div></button>
                            <button className="relative h-[100%] px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tr-3xl rounded-br-3xl"><div className='flex justify-center items-start gap-1'><span>{video.dislikes}</span><img src={dislike_img}/></div></button>
                        </div>
                        <button className="px-5 py-2 bg-gray-100 rounded-3xl cursor-pointer hover:bg-gray-200">Share</button>
                    </div>
                </div>
                <div className="pb-5 bg-gray-100 w-[100%] rounded-xl p-2 flex flex-col justify-start items-start gap-1">
                    <span className='font-bold text-[12px]'>{video.views} views, { video.uploadDate ? uploadDate(video.uploadDate) : ""} </span>
                    <span className='font-medium text-[14px]'>{video.description}</span>
                </div>

                <div className="relative w-[100%] h-[auto] flex flex-col gap-2">
                    <Comment videoId={video_id} user={loggedInUser} item={video?.comments} uploader={video?.uploader}/>
                </div>

            </div>

            <div className="relative h-[auto] w-1/4 flex flex-col justify-start items-start gap-2 px-2">
                <span className="font-bold pb-2 w-[100%]">Also Browse</span>
                { 
                    otherVideos.map((other,index)=> (
                        <Link key={index} to={ `/watch/${other._id}`} className='w-[100%]'>
                        <div className='flex justify-start items-start gap-1 w-[100%] cursor-pointer'>
                            <img src={`../../backend/${other.thumbnailUrl}`} alt='video image' className='h-[100px] w-[40%] rounded-xl border'/>
                            <div className='flex flex-col justify-start items-start w-[60%]'>
                                <span className='text-[14px] font-bold w-[100%]'>{other.title}</span>
                                <span className='text-[12px]  w-[100%]'>{other.uploader}</span>
                                <span className='w-[100%] text-[12px] text-gray-500'>{ formatViewsIntl(other.views) } * {uploadDate(other.uploadDate)}</span>
                            </div>
                        </div>
                        </Link>
                    ))
                }
                
            </div>
        </section>
        </>
    )
}

export default VideoPlayPage;