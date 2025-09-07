import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    const { loggedInUser, setLoggedInUser, setLoad } = useContext(userContext);
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    useLayoutEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, [video_id]);

    // api to get video by id
    useEffect(()=>{
        async function fetchVideo(){
            try{
                setLoad(true);
                const vid = await axios.get(`/api/video/${video_id}`);
                setVideo(vid.data.data);
            } catch(err){
                navigate("/error");
                setLoad(false);
            }
        }
        fetchVideo();
        setLoad(false);
    }, [video_id, loggedInUser]);

    //api to fetch all videos
    useEffect(()=>{
        async function loadExtra() {
                try{
                    setLoad(true);
                    const resp = await axios.get("/api/video");
                    setOtherVideos(resp.data.data);
                    setLoad(false);
                } catch(err){
                    setLoad(false);
                }   
            }
            loadExtra();
            setLoad(false);
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

    //api to like a video
    async function handleAddVideoLike(){
        try{
            const resp = await axios.patch(`/api/video/like/${video_id}`, {} , { headers: { Authorization: `JWT ${localStorage.getItem('Token')}` } });
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${localStorage.getItem('Token')}`}} );
                setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    //api to dislike a video
    async function handleAddVideoDisLike(){
        try{
            const resp = await axios.patch(`/api/video/dislike/${video_id}`, {} ,{ headers: { Authorization: `JWT ${localStorage.getItem('Token')}` } });
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${localStorage.getItem('Token')}`}} );
                setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    //api to subscribe to channel
    async function handleChannelSubscribe(){
        try{
            const token = localStorage.getItem('Token');
            const resp = await axios.patch(`/api/channel/subscribe/${video.channelId._id}`, {} , { headers: {Authorization: `JWT ${token}`}});
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`}} );
                setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    //api to unsubscribe to channel
    async function handleChannelUnsubscribe(){
         try{
            const token = localStorage.getItem('Token');
            const resp = await axios.patch(`/api/channel/unsubscribe/${video.channelId._id}`, {} , { headers: {Authorization: `JWT ${token}`}});
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`}} );
                setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    return(
        <>
        <section ref={scrollRef} className="relative h-[100%] w-[100%] flex flex-col justify-start items-center lg:flex-row lg:justify-start lg:items-start gap-5 py-5 lg:px-[30px] overflow-scroll">
            <div className="relative h-[auto] w-[90%] lg:w-3/4 flex flex-col justify-start gap-2 items-start">
                <div className="relative w-[100%] h-[auto] rounded-xl overflow-hidden">
                    <video src={`${video.videoUrl}`} controls className="relative w-[100%] h-[auto]"></video>
                </div>

                <span className="font-bold text-[18px] lg:text-[20px]">{video.title}</span>

                <div className="relative w-[100%] h-[auto] flex flex-col justify-start items-start gap-5 lg:flex-row lg:justify-between lg:items-end lg:gap-0 pb-4">
                    <div className="flex flex-row justify-start items-center gap-8">
                        <div className="flex flex-col gap-0">
                            <Link to={`/channel/${video.channelId?._id}`}>
                                <span className="font-bold text-[14px]">{video.channelId?.channelName}</span> 
                            </Link>
                            <span className="text-gray-500 text-[16px]">{video.channelId?.subscribers} subscribers</span>
                        </div>
                        { ( video?.uploader !== loggedInUser?.userId )  && loggedInUser?.subs.includes(video.channelId?._id) && <button className="bg-black text-white rounded-3xl px-3 py-2 cursor-pointer text-[14px] font-medium" onClick={()=> handleChannelUnsubscribe()}>Subscribed</button> }
                        {  loggedInUser && ( video?.uploader !== loggedInUser?.userId )  && !(loggedInUser?.subs.includes(video.channelId?._id)) && <button className="bg-black text-white rounded-3xl px-3 py-2 cursor-pointer text-[14px] font-medium" onClick={()=> handleChannelSubscribe()}>Subscribe</button> }
                    </div>
                    <div className="flex justify-center items-center gap-3 px-2">
                        <div className="relative overflow-hidden flex">
                            <button className={`relative h-[100%] border-r ${ video?.uploader === loggedInUser?.userId || !loggedInUser ? 'bg-gray-300 pointer-events-none' : 'bg-gray-100 cursor-pointer hover:bg-gray-200' } border-gray-400 px-6 py-2 rounded-tl-3xl rounded-bl-3xl`} disabled={( video?.uploader === loggedInUser?.userId || !loggedInUser )} onClick={() => handleAddVideoLike()}><div className='flex justify-center items-start gap-1'><img src={like_img}/><span>{video.likes}</span></div></button>
                            <button className={`relative h-[100%] px-4 py-2 ${ video?.uploader === loggedInUser?.userId || !loggedInUser ? 'bg-gray-300 pointer-events-none' : 'bg-gray-100 cursor-pointer hover:bg-gray-200' } rounded-tr-3xl rounded-br-3xl`} disabled={( video?.uploader === loggedInUser?.userId || !loggedInUser )} onClick={() => handleAddVideoDisLike()}><div className='flex justify-center items-start gap-1'><span>{video.dislikes}</span><img src={dislike_img}/></div></button>
                        </div>
                        <button className="px-5 py-2 bg-gray-100 rounded-3xl cursor-pointer hover:bg-gray-200">Share</button>
                    </div>
                </div>
                { !loggedInUser && <span className='pb-2 text-gray-500'>Sign in to subscribe and add video like/dislike.</span> }
                <div className="pb-5 bg-gray-100 w-[100%] rounded-xl p-2 flex flex-col justify-start items-start gap-1">
                    <span className='font-bold text-[12px]'>{video.views} views, { video.uploadDate ? uploadDate(video.uploadDate) : ""} </span>
                    <span className='font-medium text-[14px]'>{video.description}</span>
                </div>

                <div className="relative w-[100%] h-[auto] flex flex-col gap-2">
                    <Comment videoId={video_id} user={loggedInUser} item={video?.comments} uploader={video?.uploader}/>
                </div>

            </div>

            <div className="relative h-[auto] w-[100%] lg:w-1/4 flex flex-col justify-start items-start gap-2 px-2">
                <span className="font-bold pb-2 w-[100%]">Also Browse</span>
                { 
                    otherVideos.map((other,index)=> (
                        <Link key={index} to={ `/watch/${other._id}`} className='w-[100%]'>
                        <div className='flex flex-col justify-start items-start lg:flex-row lg:justify-start lg:items-start gap-1 w-[100%] cursor-pointer pb-5 px-4 lg:px-0'>
                            <img src={`${other.thumbnailUrl}`} alt='video image' className='lg:h-[100px] w-[100%] h-[150px] lg:w-[40%] max-w-[300px] rounded-xl border'/>
                            <div className='flex flex-col justify-start items-start w-[60%]'>
                                <span className='text-[14px] font-bold w-[100%]'>{other.title}</span>
                                <span className='text-[12px]  w-[100%]'>{other.uploader?.username}</span>
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