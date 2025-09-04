import React, { useContext, useEffect, useRef, useState } from 'react';
import uploadVideo from '../assets/icons/uploadVideo.png'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userContext from '../assets/utils/userContext';
import AddVideoToChannel from './AddVideoToChannel';
import { formatDistanceToNowStrict } from 'date-fns';
import channelBanner from '../assets/icons/channelBanner.png';
import channelPicture from '../assets/icons/channelPic.png';
import uploadVideoThumb from '../assets/icons/uploadVideoThumb.png';

function ChannelHome(){
    const { channel_id }  = useParams();
    const [ channel, setChannel] = useState({});
    const [ addVideo, setAddVideo] = useState(false);
    const [ bannerPic, setBannerPic ] = useState(null);
    const [ channelDesc, setChannelDesc] = useState(null);
    const [ channelPic, setChannelPic] = useState(null);
    const [ showChannelOptions, setShowChannelOptions] = useState(false);
    const [ showVideoOptsByVidId, setShowVideoOptsByVidId] = useState(null);
    const [ showSetDesc, setShowSetdesc] = useState(false);
    const [ showSetBanner, setShowSetBanner] = useState(false);
    const [ bannerPreview, setBannerPreview] = useState(null);
    const [ showSetPic, setShowSetPic] = useState(false);
    const [ picPreview, setPicPreview] = useState(null);
    const user = useContext(userContext);
    const bannerRef = useRef(null);
    const pictureRef = useRef(null);
    const [ videoThumbModal, setVideoThumbModal ] = useState(false);
    const videoThumbRef = useRef(null);
    const [ videoThumb , setVideoThumb ] = useState(null);
    const [ videoThumbPreview, setVideoThumbPreview] = useState(null);
    const [ videoDescModal, setVideoDescModal] = useState(false);
    const [ videoDesc, setVideoDesc ] = useState(null);
    const [ videoTitleModal, setVideoTitleModal] = useState(false);
    const [ videoTitle, setVideoTitle ] = useState(null);
    const [ videoCatModal, setVideoCatModal] = useState(false);
    const [ videoCat, setVideoCat ] = useState(null);
    const vidMenuRef = useRef({});
    const channelMenuRef = useRef(null);
    const [ updateVideoId, setUpdateVideoId] = useState(null);
    const [showUpdateBanner , setShowUpdateBanner] = useState(false);
    const [ showUpdateDesc, setShowUpdateDesc] = useState(false);
    const [ showUpdatePic, setShowUpdatePic] = useState(false);
    const [ update, setUpdate ] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function loadChannel(){
            try{
                const res = await axios.get(`/api/channel/${channel_id}`);
                if(res.status === 200){
                    setChannel(res.data.data);
                }
            } catch(err){
                navigate(`/error`, { state: { url: window.location.pathname} });
            }
        }
        loadChannel();
    }, [ update, channel_id, user.loggedInUser]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (showVideoOptsByVidId) {
                const currentRef = vidMenuRef.current[showVideoOptsByVidId];
                if ( currentRef && currentRef.current && !currentRef.current.contains(event.target)) {
                    setShowVideoOptsByVidId(null);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showVideoOptsByVidId]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (channelMenuRef.current && !channelMenuRef.current.contains(event.target)) {
            setShowChannelOptions(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleShowAddVideoToChannel(){
        setAddVideo(true);
    }

    async function handleAddVideoToChannel(data){
        try{
            const formData = new FormData();
            formData.append('video', data.videoFile);
            formData.append('thumbnail', data.thumbFile);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('channelId', channel_id); 
            const token = localStorage.getItem('Token');
            const resp = await axios.post(`/api/video/upload`, formData, { headers: {Authorization: `JWT ${token}`}} );
            if (resp.status === 201){
                setAddVideo(false);
                setUpdate(!update);
            }
        } catch(err){
            if(err.response.status === 401){
                setAddVideo(false);
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    async function handledeleteChannel(){
        try{
            const resp = await axios.delete(`/api/channel/${channel_id}`,{ headers: { Authorization: `JWT ${localStorage.getItem('Token')}` } });
            if(resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${localStorage.getItem('Token')}`}} );
                user.setLoggedInUser(userResp.data.data);
                alert("Channel deleted successfully!");
                navigate("/");
            }
        } catch(err){
            if(err.response.status === 401){
                setShowChannelOptions(false);
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    async function handleModifyChannelDetails(){
        try{
            const formData = new FormData();
            if(bannerPic){
                formData.append("channelBanner", bannerPic);
            }

            if(channelPic){
                formData.append("channelImage", channelPic);
            }
            
            if(channelDesc){
                formData.append("description", channelDesc);
            }

            const resp = await axios.patch(`/api/channel/update/${channel_id}`, formData,{ headers: { Authorization: `JWT ${localStorage.getItem('Token')}` } });
            if(resp.status === 200){
                setShowSetPic(false);
                setChannelPic(null);
                setPicPreview(null);
                setShowSetdesc(false);
                setChannelDesc(null);
                setShowSetBanner(false);
                setBannerPic(null);
                setBannerPreview(null);
                setShowUpdateBanner(false);
                setShowUpdateDesc(false);
                setShowUpdatePic(false);
                setUpdate(!update);
            }
        
        } catch(err){
            if(err.response.status === 401){
                setShowSetPic(false);
                setChannelPic(null);
                setPicPreview(null);
                setShowSetdesc(false);
                setChannelDesc(null);
                setShowSetBanner(false);
                setBannerPic(null);
                setBannerPreview(null);
                setShowUpdateBanner(false);
                setShowUpdateDesc(false);
                setShowUpdatePic(false);
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    function uploadedOn(date){
        return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    }

    function handleBannerSetClick(){
        bannerRef.current.click();
    }

    function handlePicSetClick(){
        pictureRef.current.click();
    }

    function handleThumbSetClick(){
        videoThumbRef.current.click();
    }

    function handleVideoThumbChange(e){
        if(e.target.files[0]){
            setVideoThumb(e.target.files[0]);
            setVideoThumbPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleBannerFileChange(e){
        if(e.target.files[0]){
            setBannerPic(e.target.files[0]);
            setBannerPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handlePictureFileChange(e){
        if(e.target.files[0]){
            setChannelPic(e.target.files[0]);
            setPicPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleSetDesc(e){
        setVideoDescModal(true);
        setVideoDesc(e);
    }

    function handleSetTitle(title){
        setVideoTitleModal(true);
        setVideoTitle(title);
    }

    function handleSetCategory(category){
        setVideoCatModal(true);
        setVideoCat(category);
    }

    async function handleDeleteVideo(id){
        try{
            const token = localStorage.getItem('Token');
            const resp = await axios.delete(`/api/video/delete/${id}`, { headers: {Authorization: `JWT ${token}`}} );
            if(resp.status === 200){
                setUpdate(!update);
            }
        } catch(err){
            if(err.response.status === 401){
                setShowVideoOptsByVidId(null);
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    async function handleModifyVideoDetails(data){
        try{
            const formData = new FormData();
            for (const key in data){
                formData.append(key, data[key]);
            }
            const token = localStorage.getItem('Token');
            const resp = await axios.patch(`/api/video/update/${updateVideoId}`, formData , { headers: {Authorization: `JWT ${token}`}} );
            if(resp.status === 200){
                setVideoThumbModal(false);
                setVideoDescModal(false); 
                setVideoTitleModal(false);
                setVideoCatModal(false);
                setVideoDesc(null);
                setVideoTitle(null);
                setVideoCat(null);
                setVideoThumb(null);
                setVideoThumbPreview(null);
                setUpdate(!update);
            }
        } catch(err){
            if(err.response.status === 401){
                setVideoThumbModal(false);
                setVideoDescModal(false); 
                setVideoTitleModal(false);
                setVideoCatModal(false);
                setVideoDesc(null);
                setVideoTitle(null);
                setVideoCat(null);
                setVideoThumb(null);
                setVideoThumbPreview(null);
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    function handleSetShowVideoOptsByVidId(e){
        setShowVideoOptsByVidId(e);
        setUpdateVideoId(e);
    }

    function handleUpdateDesc(){
        setShowUpdateDesc(true);
        setChannelDesc(channel.description);
    }

    async function handleChannelSubscribe(){
        try{
            const token = localStorage.getItem('Token');
            const resp = await axios.patch(`/api/channel/subscribe/${channel_id}`, {} , { headers: {Authorization: `JWT ${token}`}});
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`}} );
                user.setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response.status === 401){
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    async function handleChannelUnsubscribe(){
         try{
            const token = localStorage.getItem('Token');
            const resp = await axios.patch(`/api/channel/unsubscribe/${channel_id}`, {} , { headers: {Authorization: `JWT ${token}`}});
            if (resp.status === 200){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`}} );
                user.setLoggedInUser(userResp.data.data);
            }
        } catch(err){
            if(err.response.status === 401){
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    return(
        <>
        <section className='relative flex justify-center items-center w-[100%] p-1'>
            <article className="relative flex flex-col gap-3 justify-center items-center w-[100%]">
                { channel.channelBanner && 
                    <div className='relative w-[100%] max-w-[1300px] rounded-2xl overflow-hidden p-2 pb-4'>
                        <img src={channel.channelBanner} alt='banner' className='relative h-[180px] w-[100%] object-cover'/>
                    </div>
                }
                <div className='relative w-[100%] max-w-[1300px] flex flex-row gap-4 p-2'>
                    { channel.channelImage && <img src={channel.channelImage} alt='' className='relative h-[180px] w-[180px] rounded-full overflow-hidden'/>}
                    { !channel.channelImage && <div className='relative group'>
                        <span className='relative flex justify-center items-center h-[180px] w-[180px] rounded-full overflow-hidden bg-green-800 text-white text-[66px] font-bold leading-none text-center'>
                            {channel.channelName?.charAt(0).toUpperCase()}
                        </span>
                        { user?.loggedInUser?.userId === channel.owner_id && 
                        <span className='absolute inset-0 bg-black bg-opacity-30 h-[180px] w-[180px] rounded-full overflow-hidden flex justify-center items-center text-white opacity-0 group-hover:opacity-100 cursor-pointer' onClick={() => setShowSetPic(true)}>
                            Add image
                        </span>
                        }
                    </div>
                    }
                    { showSetPic && 
                        <div className='absolute top-50 left-50 border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                            <span className='w-[70%] text-[24px] font-bold'>Add channel display picture:</span>
                            { !picPreview && 
                                <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handlePicSetClick}>
                                    <img src={channelPicture} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>Select an image.</span>
                                </div>
                            }
                            { picPreview && 
                                <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handlePicSetClick}>
                                    <img src={picPreview} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>{channelPic.name}</span>
                                </div>
                            }

                            <input type='file' accept="image/*" ref={pictureRef} className='hidden' onChange={handlePictureFileChange}/>
                            <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-8 bg-blue-600 border-blue-600 text-white cursor-pointer '>Set Picture</button>
                            <button onClick={() => setShowSetPic(false)} className=' border rounded-3xl py-2 px-12 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                        </div>
                    }
                    <div className='flex flex-col justify-start items-start gap-2 min-w-[400px] max-w-[700px]'>
                        <span className='font-bold text-[32px]'>{channel.channelName}</span>
                        <div className='flex flex-row justify-start items-start gap-1'>
                            <span className='font-bold text-[14px]'>{channel.channelHandle}</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>{channel.subscribers} subscribers</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>{channel.videos?.length} videos</span>
                        </div>
                        { user?.loggedInUser?.userId === channel.owner_id && !channel.description && <span className='relative text-gray-500 text-[14px] p-1 cursor-pointer hover:text-black hover:underline' onClick={() => setShowSetdesc(true)}>Add channel description...</span>}
                        { channel.description && <span className='text-[14px] font-medium pb-3'>{channel.description}</span>}
                        { showSetDesc && 
                            <div className='absolute top-50 border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                                <span className='w-[70%] text-[24px] font-bold'>Add channel description:</span>
                                <span className='w-[70%] text-[14px] py-2'>Describe what is your channel all about. This helps visitors understand your content and goals. Go ahead and add a suitable description.</span>
                                <textarea type='text' placeholder='Add description here...' rows="7" className='w-[70%] border rounded p-2 my-2' onChange={(e) => setChannelDesc(e.target.value)}/>
                                <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Set description</button>
                                <button onClick={() => setShowSetdesc(false)} className=' border rounded-3xl py-2 px-12 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>
                        }
                        { user?.loggedInUser?.userId === channel.owner_id && !channel.channelBanner && <button className='relative text-white bg-black font-medium text-[14px] border rounded-3xl py-2 px-4 cursor-pointer hover:shadow-lg' onClick={() => setShowSetBanner(true)}>Upload banner</button>}
                        { showSetBanner && 
                            <div className='absolute top-50 border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                                <span className='w-[70%] text-[24px] font-bold'>Add channel banner:</span>
                                { !bannerPreview && <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handleBannerSetClick}>
                                    <img src={channelBanner} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>Select an image.</span>
                                    </div>
                                }
                                { bannerPreview && <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handleBannerSetClick}>
                                    <img src={bannerPreview} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>{bannerPic.name}</span>
                                    </div>
                                }
                                <input type='file' accept="image/*" ref={bannerRef} className='hidden' onChange={handleBannerFileChange}/>
                                <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-8 bg-blue-600 border-blue-600 text-white cursor-pointer '>Set banner</button>
                                <button onClick={() => setShowSetBanner(false)} className=' border rounded-3xl py-2 px-12 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>
                        }
                        { (channel.owner_id !== user.loggedInUser?.userId) && user.loggedInUser?.subs.includes(channel._id) && <button className='px-3 py-2 border border-black rounded-3xl bg-black text-white font-bold text-[14px] cursor-pointer' onClick={() => handleChannelUnsubscribe()}>Subscribed</button> }
                        { user.loggedInUser && (channel.owner_id !== user.loggedInUser?.userId) && !(user.loggedInUser?.subs.includes(channel._id)) && <button className='px-3 py-2 border border-black rounded-3xl bg-black text-white font-bold text-[14px] cursor-pointer' onClick={() => handleChannelSubscribe()}>Subscribe</button>  }
                        { !user.loggedInUser && <span className='text-gray-500 text-[14px]'>Sign in to subscribe to channel.</span>}
                    </div>
                    <div className='relative flex flex-col gap-0 justify-start items-start p-1'>
                       { user?.loggedInUser?.userId === channel.owner_id && <button className='relative h-[40px] w-[40px] font-bold text-[24px] hover:bg-gray-200  rounded-full' onClick={() => setShowChannelOptions(!showChannelOptions)}>&#x22EE;</button>}
                       { showChannelOptions && 
                            <div ref={channelMenuRef} className='absolute border border-gray-300 rounded top-11 right-1 w-[200px] shadow z-30 overflow-hidden'>
                                { channel.channelBanner && <button className='relative w-[100%] h-[44px] border-b border-gray-200 bg-white text-[14px]  hover:bg-gray-200 cursor-pointer' onClick={() => setShowUpdateBanner(true)}>Update banner</button> }
                                { channel.channelImage && <button className='relative w-[100%] h-[44px] border-b border-gray-200 bg-white text-[14px]  hover:bg-gray-200 cursor-pointer' onClick={() => setShowUpdatePic(true)}>Update picture</button> }
                                { channel.description && <button className='relative w-[100%] h-[44px] border-b border-gray-200 bg-white text-[14px]  hover:bg-gray-200 cursor-pointer' onClick={() => handleUpdateDesc()}>Update description</button> }
                                <button className='relative w-[100%] h-[44px] border-b border-gray-200 bg-white  text-red-500 text-[14px]  hover:bg-red-100 cursor-pointer' onClick={handledeleteChannel}>Delete channel</button>
                            </div>
                        }
                    </div>
                    { showUpdateBanner &&
                        <div className='absolute border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                            <span className='w-[70%] text-[24px] font-bold'>Update channel banner:</span>
                                { !bannerPreview && <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handleBannerSetClick}>
                                    <img src={channelBanner} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>Select an image.</span>
                                    </div>
                                }
                                { bannerPreview && <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handleBannerSetClick}>
                                    <img src={bannerPreview} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>{bannerPic.name}</span>
                                    </div>
                                }
                            <input type='file' accept="image/*" ref={bannerRef} className='hidden' onChange={handleBannerFileChange}/>
                            <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-8 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update banner</button>
                            <button onClick={() => setShowUpdateBanner(false)} className=' border rounded-3xl py-2 px-15 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                        </div>
                    }
                    { showUpdateDesc &&
                        <div className='absolute border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                            <span className='w-[70%] text-[24px] font-bold'>Update channel description:</span>
                            <textarea type='text' placeholder='Update description here...' value={channelDesc} rows="7" className='w-[70%] border rounded p-2 my-2' onChange={(e) => setChannelDesc(e.target.value)}/>
                            <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update description</button>
                            <button onClick={() => setShowUpdateDesc(false)} className=' border rounded-3xl py-2 px-16 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                        </div>
                    }
                    { showUpdatePic && 
                        <div className='absolute border w-[700px] py-8 bg-white z-40 flex flex-col gap-4 justify-center items-center rounded shadow'>
                            <span className='w-[70%] text-[24px] font-bold'>Update channel display picture:</span>
                            { !picPreview && 
                                <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handlePicSetClick}>
                                    <img src={channelPicture} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>Select an image.</span>
                                </div>
                            }
                            { picPreview && 
                                <div className='w-[70%] flex flex-col gap-2 justify-center items-center cursor-pointer' onClick={handlePicSetClick}>
                                    <img src={picPreview} alt="image" className='h-[180px]'/>
                                    <span className='text-[14px] font-light'>{channelPic.name}</span>
                                </div>
                            }

                            <input type='file' accept="image/*" ref={pictureRef} className='hidden' onChange={handlePictureFileChange}/>
                            <button onClick={() => handleModifyChannelDetails()} className=' border rounded-3xl py-2 px-8 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update Picture</button>
                            <button onClick={() => setShowUpdatePic(false)} className=' border rounded-3xl py-2 px-15 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                        </div>
                    }
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
                            { user?.loggedInUser?.userId === channel.owner_id && channel.videos?.length !== 0  && <button className=' px-3 py-2 bg-white text-blue-600 rounded-3xl text-[14px] hover:shadow-lg cursor-pointer border border-blue-600 hover:bg-blue-100' onClick={() => setAddVideo(true)}>Add video</button>}
                        </div>
                    </div>
                </div>
                { user?.loggedInUser?.userId === channel.owner_id && channel.videos?.length === 0  &&
                    <div className='relative w-[100%] max-w-[1300px] h-[250px] flex flex-col justify-center items-center  overflow-hidden p-4'>
                        <div className='p-8 rounded-3xl hover:bg-gray-100 cursor-pointer' onClick={handleShowAddVideoToChannel}>
                        <img src={uploadVideo} className='h-auto w-auto'/>
                        <span className='text-[14px] text-gray-500'>Add your first video...</span>
                        </div>
                    </div>
                }
                {
                    addVideo &&  
                    <div className='absolute z-30 top-[3%] left-[20%]'>
                        <div className='relative w-[100% h-[100%] flex justify-center items-center'>
                            <AddVideoToChannel add={(e) => handleAddVideoToChannel(e)} cancel={setAddVideo}/>
                        </div>
                    </div>
                }
                { channel.videos?.length !== 0  &&
                    <div className='relative w-[100%] max-w-[1300px] h-[100%] flex flex-row justify-start items-center gap-3 flex-wrap p-2'>
            
                        { channel.videos?.map( (vid, idx) => { 
                            if (!vidMenuRef.current[vid._id]) {
                                vidMenuRef.current[vid._id] = React.createRef();
                            }
                            return( 
                            <div key={vid._id} className='relative flex flex-col justify-start items-start gap-0 p-1 h-[340px] w-[30%] '>
                                <Link to={`/watch/${vid._id}`} className='w-[100%] cursor-pointer'>
                                <img src={vid.thumbnailUrl} alt="video" className='relative h-[200px] w-[100%] rounded-xl object-cover pb-1'/>
                                </Link>
                                <div className='flex flex-row justify-between items-start w-[100%]'>
                                    <div className='flex flex-col'>
                                 <Link to={`/watch/${vid._id}`} className='w-[100%] cursor-pointer'>
                                <span className='w-[100%] text-[16px] font-bold text-black py-1 px-2'>{vid.title}</span>
                                </Link>
                                <span className='w-[100%] text-[14px] px-2 line-clamp-2'>{vid.description}</span>
                                <div className='w-[100%] flex flex-row justify-start items-start gap-1'>
                                    <span className='text-[14px] text-gray-500 py-1 px-2'>{vid.views} views</span>
                                    <span className='text-[14px] text-gray-500 py-1 px-2'>{vid.likes ? vid.likes : 0} likes</span>
                                    <span className='text-[14px] text-gray-500 py-1 px-2'>{vid.comments ? vid.comments.length : 0} comments</span>
                                </div>
                                <span className='w-[100%] text-[14px] text-gray-500 py-1 px-2'>{uploadedOn(vid.uploadDate)}</span>
                                </div>
                                { user?.loggedInUser?.userId === channel.owner_id &&
                                <div ref={vidMenuRef.current[vid._id]}>
                                    <button className='relative h-[40px] w-[40px] font-bold text-[24px] hover:bg-gray-200  rounded-full cursor-pointer' onClick={() => handleSetShowVideoOptsByVidId(vid._id)}>&#x22EE;</button>
                                    { showVideoOptsByVidId === vid._id && <div className='absolute right-2 border border-gray-300 rounded shadow-xl w-[150px] z-30'>
                                        <button className='relative border-b border-gray-200 bg-white w-[100%] h-[44px] text-[12px] hover:bg-gray-200 cursor-pointer' onClick={() => handleSetTitle(vid.title) }>Change title</button>
                                        <button className='relative border-b border-gray-200 bg-white w-[100%] h-[44px] text-[12px] hover:bg-gray-200 cursor-pointer' onClick={() => handleSetCategory(vid.category) }>Change category</button>
                                        <button className='relative border-b border-gray-200 bg-white w-[100%] h-[44px] text-[12px] hover:bg-gray-200 cursor-pointer' onClick={() => setVideoThumbModal(true) }>Change thumbnail</button>
                                        <button className='relative border-b border-gray-200 bg-white w-[100%] h-[44px] text-[12px] hover:bg-gray-200 cursor-pointer' onClick={() => handleSetDesc(vid.description) }>Change description</button>
                                        <button className='relative border-b border-gray-200 bg-white w-[100%] h-[44px] text-red-500 text-[12px] hover:bg-red-100 cursor-pointer' onClick={() => handleDeleteVideo(vid._id)}>Delete video</button>
                                        </div>}
                                </div>
                                }
                                </div>
                            </div>
                            ) 
                            } )
                        }
                        { videoThumbModal &&
                            <div className='absolute top-0 left-80 border border-gray-500 w-[700px] flex flex-col justify-center items-center gap-4 z-30 bg-white rounded shadow-xl py-4'>
                                <span className='text-[20px] font-bold w-[70%] py-1'>Update video thumbnail:</span>
                                { !videoThumbPreview && <div className='cursor-pointer px-4 flex flex-col justify-center items-center bg-center py-4 hover:bg-blue-100 ' onClick={handleThumbSetClick}><img src={uploadVideoThumb} alt='image' className='h-[100px]'/>
                                <span>Select a thumbnail image</span></div> }
                                { videoThumbPreview && <div className='cursor-pointer px-4 flex flex-col justify-center items-center bg-center py-4 hover:bg-blue-100 '  onClick={handleThumbSetClick}><img src={videoThumbPreview} alt='image' className='h-[100px]'/>
                                <span>{videoThumb.name}</span></div>}
                                <input type='file' accept='image' className='hidden' ref={videoThumbRef} onChange={handleVideoThumbChange}/>
                                <button onClick={() => handleModifyVideoDetails({'thumbnail' : videoThumb}) } className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update thumbnail</button>
                                <button onClick={() => setVideoThumbModal(false) } className=' border rounded-3xl py-2 px-15 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>                             
                        }
                        { videoDescModal &&
                            <div className='absolute top-0 left-80 border border-gray-500 w-[700px] flex flex-col justify-center items-center gap-4 z-30 bg-white rounded shadow-xl py-4'>
                                <span className='text-[20px] font-bold w-[70%] py-1'>Update video description:</span>
                                <textarea className='border w-[70%] p-2' rows="7" placeholder='Update description here...' value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)}></textarea>
                                <button onClick={() => handleModifyVideoDetails({description: videoDesc} , showVideoOptsByVidId ) } className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update description</button>
                                <button onClick={() => setVideoDescModal(false) } className=' border rounded-3xl py-2 px-15 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>                             
                        }
                        {
                            videoTitleModal && 
                            <div className='absolute top-0 left-80 border border-gray-500 w-[700px] flex flex-col justify-center items-center gap-4 z-30 bg-white rounded shadow-xl py-4'>
                                <span className='text-[20px] font-bold w-[70%] py-1'>Update video title:</span>
                                <input type="text" className='border w-[70%] p-2 mb-3'  placeholder='Update title here...' value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}/>
                                <button onClick={() => handleModifyVideoDetails({title: videoTitle} , showVideoOptsByVidId ) } className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update Title</button>
                                <button onClick={() => setVideoTitleModal(false) } className=' border rounded-3xl py-2 px-10 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>  
                        }
                        {
                            videoCatModal && 
                            <div className='absolute top-0 left-80 border border-gray-500 w-[700px] flex flex-col justify-center items-center gap-4 z-30 bg-white rounded shadow-xl py-4'>
                                <span className='text-[20px] font-bold w-[70%] py-1'>Update video category:</span>
                                <input type="text" className='border w-[70%] p-2 mb-3'  placeholder='Update category here...' value={videoCat} onChange={(e) => setVideoCat(e.target.value)}/>
                                <button onClick={() => handleModifyVideoDetails({category: videoCat}, showVideoOptsByVidId ) } className=' border rounded-3xl py-2 px-5 bg-blue-600 border-blue-600 text-white cursor-pointer '>Update Category</button>
                                <button onClick={() => setVideoCatModal(false) } className=' border rounded-3xl py-2 px-14 bg-white border-red-600 text-red-600 cursor-pointer '>Cancel</button>
                            </div>  
                        }
                        
                    </div>
                }
            </article>
        </section>
        </>
    )
}

export default ChannelHome;