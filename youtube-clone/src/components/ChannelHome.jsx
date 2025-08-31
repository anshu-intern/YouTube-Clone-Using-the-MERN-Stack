import { useContext, useEffect, useState } from 'react';
import uploadVideo from '../assets/icons/uploadVideo.png'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../assets/utils/userContext';
import AddVideoToChannel from './AddVideoToChannel';
import { formatDistanceToNowStrict } from 'date-fns';

function ChannelHome(){
    const { channel_id }  = useParams();
    const [ channel, setChannel] = useState({});
    const [ addVideo, setAddVideo] = useState(false);
    const [ bannerPic, setBannerPic ] = useState(null);
    const [ channelDesc, setChannelDesc] = useState(null);
    const user = useContext(userContext);

    useEffect(() => {
        async function loadChannel(){
            try{
                const res = await axios.get(`http://localhost:3000/api/channel/${channel_id}`,{ headers: { Authorization: `JWT ${localStorage.getItem('Token')}` } });
                if(res.status === 200){
                    console.log(res.data.data);
                    setChannel(res.data.data);
                }
            } catch(err){
                console.error(err);
            }
        }
        loadChannel();
    }, []);

    function handleSetChannelDesc(){
        const newDesc = prompt("Enter description");
    }

    function handleShowAddVideoToChannel(){
        setAddVideo(true);
    }

    async function handleAddVideoToChannel(data){
        console.log(data);
        try{
            const formData = new FormData();
            formData.append('video', data.videoFile);
            formData.append('thumbnail', data.thumbFile);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('channelId', channel_id); 
            const token = localStorage.getItem('Token');
            const resp = await axios.post(`http://localhost:3000/api/video/upload`, formData, { headers: {Authorization: `JWT ${token}` , 'Content-Type': 'multipart/form-data'}} );
            console.log(resp);
        } catch(err){
            console.log(err);
        }
    }

    function uploadedOn(date){
        return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    }

    return(
        <>
        <section className='relative flex justify-center items-center w-[100%] p-1'>
            <article className="relative flex flex-col gap-3 justify-center items-center w-[100%]">
                { channel.channelBanner && 
                    <div className='relative w-[100%] max-w-[1300px] rounded-2xl overflow-hidden p-2 bg-gray-300'>
                        <img src={channel.channelBanner} alt='banner' className='relative h-[180px] w-[100%]'/>
                    </div>
                }
                <div className='relative w-[100%] max-w-[1300px] flex flex-row gap-4 overflow-hidden p-2'>
                    { channel.channelImage && <img src={channel.channelImage} alt='' className='relative h-[180px] w-[180px] rounded-full overflow-hidden'/>}
                    { !channel.channelImage && <div className='relative group'>
                        <span className='relative flex justify-center items-center h-[180px] w-[180px] rounded-full overflow-hidden bg-green-800 text-white text-[66px] font-bold leading-none text-center'>
                            {channel.channelName?.charAt(0).toUpperCase()}
                        </span>
                        <span className='absolute inset-0 bg-black bg-opacity-30 rounded-full overflow-hidden flex justify-center items-center text-white opacity-0 group-hover:opacity-100 cursor-pointer'>
                            Add image
                        </span>
                    </div>
                    }
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <span className='font-bold text-[32px]'>{channel.channelName}</span>
                        <div className='flex flex-row justify-start items-start gap-1'>
                            <span className='font-bold text-[14px]'>{channel.channelHandle}</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>{channel.subscribers} subscribers</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>{channel.videos?.length} videos</span>
                        </div>
                        { !channel.description && <span className='text-gray-500 text-[14px] p-1 cursor-pointer hover:text-black hover:underline' onClick={handleSetChannelDesc}>Add channel description...</span>}
                        { !channel.channelBanner && <button className='text-white bg-black font-medium text-[14px] border rounded-3xl py-2 px-4 cursor-pointer hover:shadow-lg'>Upload banner</button>}
                        <span className='text-gray-500 text-[14px] w-[]'>{channel.description}</span>
                        { channel.owner_id !== user.loggedInUser.userId ? (<button className='px-3 py-2 border border-black rounded-3xl bg-black text-white font-bold text-[14px]'>Subscribe</button>) : <></> }
                    </div>
                </div>
                <div className='relative h-[100%] w-[100%] text-[16px] font-medium text-gray-500 border-b border-gray-300'>
                    <div className='flex flex-row gap-6 justify-center items-center'>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Home</span>
                        </div>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Videos</span>
                        </div>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Shorts</span>
                        </div>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Live</span>
                        </div>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Playlists</span>
                        </div>
                        <div className='relative h-[100%] cursor-pointer border-2 border-white  hover:border-b-black  hover:text-black p-2'>
                            <span>Posts</span>
                        </div>
                        <div>
                            <button className=' px-3 py-2 bg-gray-300 text-black rounded-3xl text-[14px] hover:shadow-lg cursor-pointer' onClick={() => setAddVideo(true)}>Add video</button>
                        </div>
                    </div>
                </div>
                { channel.videos?.length === 0  &&
                    <div className='relative w-[100%] max-w-[1300px] h-[250px] flex flex-col justify-center items-center  overflow-hidden p-4' onClick={handleShowAddVideoToChannel}>
                        <div className='p-8 rounded-3xl hover:bg-gray-100 cursor-pointer'>
                        <img src={uploadVideo} className='h-auto w-auto'/>
                        <span className='text-[14px] text-gray-500'>Add your first video...</span>
                        </div>
                    </div>
                }
                {
                    addVideo &&  
                    <div className='absolute z-30 top-[3%] left-[20%]'>
                        <div className='relative w-[100% h-[100%] flex justify-center items-center'>
                            <AddVideoToChannel add={handleAddVideoToChannel} cancel={setAddVideo}/>
                        </div>
                    </div>
                }
                { channel.videos?.length !== 0  &&
                    <div className='relative w-[100%] max-w-[1300px] h-[100%] flex flex-row justify-start items-center gap-4 flex-wrap overflow-hidden p-2'>
            
                        { channel.videos?.map( (vid, idx) => ( 
                            <div key={vid._id} className='relative flex flex-col justify-start items-start gap-0 p-1 h-[300px] w-[30%]  overflow-hidden'>
                                <Link to={`/watch/${vid._id}`} className='w-[100%] cursor-pointer'>
                                <img src={`../../backend/${vid.thumbnailUrl}`} alt="video" className='relative h-[200px] w-[100%] rounded-xl'/>
                                </Link>
                                 <Link to={`/watch/${vid._id}`} className='w-[100%] cursor-pointer'>
                                <span className='w-[100%] text-[16px] font-bold text-black py-1'>{vid.title}</span>
                                </Link>
                                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{vid.views} views</span>
                                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{uploadedOn(vid.uploadDate)}</span>
                            </div>))
                        }
                    </div>
                }
            </article>
        </section>
        </>
    )
}

export default ChannelHome;