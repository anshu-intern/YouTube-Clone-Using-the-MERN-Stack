import { useNavigate, Link } from 'react-router-dom';
import icon from '../assets/icons/head_icon.png'
import serachicon from '../assets/icons/searchicon.png';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import userContext from '../assets/utils/userContext';
import CreateChannel from './CreateChannel';
import axios from 'axios';

function Header({toggleSideBar}){
    const user = useContext(userContext);
    const [userMenu , setUserMenu] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const navigate = useNavigate();
    const [ searchText, setSearchText ] = useState('');
    const [ searchBar, setSearchBar ] = useState(false);
    const userdropDownRef = useRef(null);
    const [ showSearch, setShowSearch ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        async function fetchUserData(){
            try{
                user.setLoad(true);
                const resp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`}} );
                user.setLoggedInUser(resp.data.data);
                user.setLoad(false);
            } catch(err){
                if(err.response.status === 401){
                    localStorage.removeItem('Token');
                    user.setLoggedInUser(null);
                    alert("User session expired. Please login and try again.");
                } else {
                    alert("Error occured! Please try after some time.");
                }
                user.setLoad(false);
            }
        }
        if(token){
            fetchUserData();
        }
        user.setLoad(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userdropDownRef.current && !userdropDownRef.current.contains(event.target)) {
                setUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    function handleSignIn(){
        user.setLoad(true);
        setTimeout(() => navigate("/login"),1000)
    }

    function handleUserIcon(){
        setUserMenu(!userMenu);
    }

    function handleCreateChannel(){
        setUserMenu(!userMenu);
        setShowCreateChannel(true);
    }

    function handleCloseCreateChannel(){
        setShowCreateChannel(false);
    }

    async function handleCreateChannelClick(e){
        try{
            const formData = new FormData();
            formData.append('channelName', e.channelName);
            formData.append('channelHandle', e.channelHandle);
            if (e.channelPic){
                formData.append('channelImage', e.channelPic);
            }
            const token = localStorage.getItem('Token');
            user.setLoad(true);
            const res = await axios.post("/api/channel/", formData, { headers: {Authorization: `JWT ${token}`} });
            if (res.status === 201){
                const userResp = await axios.get("/api/user/data", { headers: {Authorization: `JWT ${token}`} });
                user.setLoggedInUser(userResp.data.data);
                setShowCreateChannel(false);
                user.setLoad(false);
                navigate(`/channel/${res.data.channelId}`);
            }
        } catch(err){
            if(err.response.status === 401){
                localStorage.removeItem('Token');
                user.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            }
            if (err.response.status === 500){
                alert("Error occured! Please try after some time.");
            }
            if (err.response.status === 400){
                alert(err.response.data.message);
            }
            user.setLoad(false);
        }
    }

    function navigateHome(){
        navigate("/");
    }

    function handleSignOut(){
        user.setLoad(true);
        localStorage.removeItem('Token');
        user.setLoggedInUser(null);
        user.setLoad(false);
        setTimeout(() => { navigate("/") });
    }

    function handleSearchText(e){
        setSearchText(e.target.value.trim());
    }

    function handleSearch(){
        if(searchText.length > 0){
            navigate(`/?q=${encodeURIComponent(searchText)}`);
            setSearchText('');
            setShowSearch(false);
        }
    }

    function handleShowSearch(){
        setShowSearch(!showSearch);
    }

    return(
        <>
        {
            user.load && 
            <div className='relative z-50'>
                <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-500'></span>
                <div className="absolute top-1 h-[100vh] w-[100vw] bg-black opacity-30 z-50 border-1">fedde</div>
            </div>
        }
        {
            showCreateChannel && 
            <div className='absolute z-30 top-[10%] flex justify-center items-center w-[100%]'>
                <div className='relative w-[100% h-[100%] flex justify-center items-center'>
                    <CreateChannel cancel={handleCloseCreateChannel} create={handleCreateChannelClick}/>
                </div>
            </div>
        }
        <header className="flex flex-row gap-2  h-[58px] items-stretch justify-between sticky top-0 pt-2 sm:px-1 lg:px-[20px] pb-1 z-10 bg-white">
            <div className="flex flex-row gap-3 h-[100%] items-center relative px-2 ">
                <nav className="hidden sm:block flex flex-row h-[80%] items-center relative p-1.5">
                    <button className="flex flex-col gap-1.5 justify-center w-10 cursor-pointer p-[8px] hover:bg-gray-200 hover:rounded-full" onClick={toggleSideBar}>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                    </button>
                </nav>
                <div className="relative flex flex-row h-[100%] w-[32px] sm:w-[150px] items-center relative">
                    <img src={icon} alt={"youtube image"} className='relative h-[32px] w-[32px] cursor-pointer' onClick={navigateHome}/>
                    <h1 className="text-l font-bold hover:cursor-pointer" onClick={navigateHome}>YouTube<sup className='pl-[4px] text-s font-light'>clone</sup></h1>
                </div>
            </div>
            <div className='hidden sm:block relative flex flex-row justify-center items-center h-[100%] border border-gray-500 rounded-3xl overflow-hidden'>
                { searchBar && <div className='relative h-[60%] sm:pl-3'><img src={serachicon} alt='searchicon' className='relative h-[100%] overflow-hidden'/></div> }
                <input type="text" name="search_query" value={searchText} placeholder="Search" className='relative w-[550px] h-[100%] focus:outline-none sm:px-4 sm:pl-5' onChange={ e => {handleSearchText(e)}} onFocus={e => setSearchBar(true)} onBlur={e => setSearchBar(false)}/>
                <button className='relative h-[100%] px-2.5 border-l px-6 bg-gray-100 cursor-pointer hover:bg-gray-200' onClick={handleSearch}><img src={serachicon} alt='search icon' className='relative h-[60%] overflow-hidden'></img></button>
            </div>
            <div className="relative flex flex-row gap-3 h-[100%] items-center px-2">
                <div className='block sm:hidden flex flex-row justify-center items-center h-[40px] w-[40px] border border-gray-300 bg-gray-100 rounded-full overflow-hidden'>
                   <button className='bg-gray-100 cursor-pointer hover:bg-gray-200' onClick={() => handleShowSearch()}><img src={serachicon} alt='search icon' className='relative h-[24px] w-[30px] overflow-hidden'></img></button>
                    { showSearch && 
                        <div className='absolute top-[100%] right-[0%] z-50 bg-gray-100 w-[100vw] h-[100vh] py-2 px-1'>
                            <input type="text" name="search_query" value={searchText} placeholder="Search here..." className='p-1 focus:outline-blue-100 w-[78vw] h-[40px] border bg-white' onChange={ e => {handleSearchText(e)}} onFocus={e => setSearchBar(true)} onBlur={e => setSearchBar(false)}/>
                            <button className='relative w-[18vw] h-[40px] bg-blue-500 text-white cursor-pointer hover:bg-gray-200 border border-blue-600 border-l-0' onClick={handleSearch}>search</button>
                        </div>
                    }
                </div>
                {
                    !user.loggedInUser && 
                    <button className="hidden sm:block flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-gray-200 w-[40px] rounded-full p-2">
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                    </button>
                }
                {
                    user.loggedInUser ? (
                        <div ref={userdropDownRef} className='relative h-[40px] rounded-full w-[40px] font-bold bg-green-900 text-white flex justify-center items-center cursor-pointer z-10' onClick={handleUserIcon}>
                            { user.loggedInUser.avatar ? (<img src={user.loggedInUser.avatar} alt="user" className='rounded-full'/>) : (<span>{user.loggedInUser.username?.charAt(0).toUpperCase()}</span>)}
                            { userMenu && 
                                <div className='cursor-text py-2 absolute h-[auto] w-[280px] flex flex-col justify-start items-center gap-0 border border-gray-200 shadow-2xl rounded-xl top-10 right-0 font-normal bg-white shadow-xl text-black'>
                                    <div className='flex flex-row justify-center items-start gap-4 w-[100%] border-b border-gray-300 pb-4'>
                                        <div className='ml-4 relative h-[40px] rounded-full w-[50px] bg-green-900 text-white flex justify-center items-center'>
                                            { user.loggedInUser.avatar ? (<img src={user.loggedInUser.avatar} alt="user" className='w-[100%] h-[100%] rounded-full'/>) : (<span>{user.loggedInUser.username?.charAt(0).toUpperCase()}</span>)}
                                        </div>
                                        <div className='flex flex-col w-[100%]'>
                                            <span className='w-[100%]  text-[16px] font-medium'>{user.loggedInUser.username}</span>
                                            <span className='w-[100%] text-[14px] font-medium '>{user.loggedInUser.email}</span>
                                            { user.loggedInUser.channels?.length === 0 && <span className='w-[100%] mt-3 text-[14px] font-medium text-blue-500 pb-4 cursor-pointer' onClick={handleCreateChannel}>Create a channel</span> }
                                        </div>
                                    </div>
                                    { user.loggedInUser.channels?.length !== 0 && 
                                        <div className='w-[100%] border-b border-gray-300 py-2 flex flex-col justify-start'>
                                            <span className='pl-4 py-1 font-medium text-[14px] text-gray-500'>Channels</span>
                                            {user.loggedInUser.channels?.map((channel,index) => (<Link key={channel._id} to={`/channel/${channel._id}`} className='text-[14px] py-2 pl-4 cursor-pointer hover:bg-gray-200'>{channel.channelName}</Link>))}
                                        </div>
                                    }
                                    <div className='w-[100%] flex justify-center items-center'>
                                        <span className='w-[100%] cursor-pointer hover:bg-gray-200 text-center py-2 font-light' onClick={handleSignOut}>Sign out</span>
                                    </div>
                                </div>}
                        </div> ) : (
                        <button className='relative w-[80px] border rounded-3xl px-1 sm:px-3 text-blue-500 h-[90%] font-bold cursor-pointer hover:bg-blue-100 border-gray-300' onClick={handleSignIn}>Sign in</button>
                    )
                }
            </div>
        </header>
         </>
    )
}

export default Header;