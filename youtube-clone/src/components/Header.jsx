import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons/head_icon.png'
import serachicon from '../assets/icons/searchicon.png';
import { useState } from 'react';
import { useContext } from 'react';
import userContext from '../assets/utils/userContext';
import CreateChannel from './CreateChannel'

function Header({toggleSideBar}){
    const user = useContext(userContext);
    const [loading, setLoading] = useState(false);
    const [userMenu , setUserMenu] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const navigate = useNavigate();
    const [ searchText, setSearchText ] = useState('');
    const [ searchBar, setSearchBar ] = useState(false);

    function handleSignIn(){
        setLoading(true);
        setTimeout(() => navigate("/login"),2000)
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

    function handleCreateChanelClick(){
        setShowCreateChannel(false);
        navigate("/channel");
    }

    function navigateHome(){
        navigate("/");
    }

    function handleSignOut(){
        localStorage.removeItem('Token');
        user.setLoggedInUser(null);
        setTimeout(() => { navigate("/") });
    }

    function handleSearchText(e){
        setSearchText(e.target.value.trim());
    }

    function handleSearch(){
        if(searchText.length > 0){
            navigate(`/?q=${encodeURIComponent(searchText)}`);
        }
        else{
             navigate(`/`);
        }
    }

    return(
        <>
        {
            loading && 
            <div className='relative z-20'>
                <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-500'></span>
            </div>
        }
        {
            showCreateChannel && 
            <div className='absolute z-30 top-[20%] left-[30%]'>
                <div className='relative w-[100% h-[100%] flex justify-center items-center'>
                    <CreateChannel cancel={handleCloseCreateChannel} create={handleCreateChanelClick}/>
                </div>
            </div>
        }
        <header className="flex flex-row gap-2  h-[58px] items-stretch justify-between sticky top-0 pt-2 px-[20px] pb-1 z-10 bg-white">
            <div className="flex flex-row gap-3 h-[100%] items-center relative px-2 ">
                <nav className="flex flex-row h-[80%] items-center relative p-1.5">
                    <button className="flex flex-col gap-1.5 justify-center w-10 cursor-pointer p-[8px] hover:bg-gray-200 hover:rounded-full" onClick={toggleSideBar}>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                    </button>
                </nav>
                <div className="flex flex-row h-[100%] items-center relative">
                    <img src={icon} alt={"youtube image"} className='h-[32px] cursor-pointer' onClick={navigateHome}></img>
                    <h1 className="text-l font-bold hover:cursor-pointer" onClick={navigateHome}>YouTube<sup className='pl-[4px] text-s font-light'>clone</sup></h1>
                </div>
            </div>
            <div className='relative flex flex-row justify-center items-center h-[100%] border border-gray-500 rounded-3xl overflow-hidden'>
                { searchBar && <div className='relative h-[60%] pl-3'><img src={serachicon} alt='searchicon' className='relative h-[100%] overflow-hidden'/></div> }
                <input type="text" name="search_query" placeholder="Search" className='relative w-[550px] h-[100%] focus:outline-none px-4 pl-5' onChange={ e => {handleSearchText(e)}} onFocus={e => setSearchBar(true)} onBlur={e => setSearchBar(false)}/>
                <button className='relative h-[100%] px-2.5 border-l px-6 bg-gray-100 cursor-pointer hover:bg-gray-200' onClick={handleSearch}><img src={serachicon} alt='search icon' className='relative h-[60%] overflow-hidden'></img></button>
            </div>
            <div className="relative flex flex-row gap-3 h-[100%] items-center px-2">
                {
                    !user.loggedInUser && 
                    <button className="flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-gray-200 w-[40px] rounded-full p-2">
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                        <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                    </button>
                }
                {
                    user.loggedInUser ? (
                        <div className='relative h-[40px] rounded-full w-[40px] font-bold bg-green-900 text-white flex justify-center items-center cursor-pointer z-10' onClick={handleUserIcon}>
                            <span>{user.loggedInUser.username.charAt(0).toUpperCase()}</span>
                            { userMenu && 
                                <div className='cursor-text py-2 absolute h-[auto] w-[280px] flex flex-col justify-start items-center gap-0 border border-white rounded-xl top-10 right-0 font-normal bg-white shadow-xl text-black'>
                                    <div className='flex flex-row justify-center items-start gap-4 w-[100%] border-b border-gray-300'>
                                        <div className='ml-4 relative h-[40px] rounded-full w-[50px] bg-green-900 text-white flex justify-center items-center'>
                                             <span>{user.loggedInUser.username.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div className='flex flex-col w-[100%]'>
                                            <span className='w-[100%]  text-[16px] font-medium'>{user.loggedInUser.username}</span>
                                            <span className='w-[100%] text-[14px] font-medium '>{user.loggedInUser.email}</span>
                                            <span className='w-[100%] mt-3 text-[14px] font-medium text-blue-500 pb-4 cursor-pointer' onClick={handleCreateChannel}>Create a channel</span>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex justify-center items-center'>
                                        <span className='w-[100%] cursor-pointer hover:bg-gray-200 text-center py-2 font-light' onClick={handleSignOut}>Sign out</span>
                                    </div>
                                </div>}
                        </div> ) : (
                        <button className='relative border rounded-3xl px-3 text-blue-500 h-[90%] font-bold cursor-pointer hover:bg-blue-100 border-gray-300' onClick={handleSignIn}>Sign in</button>
                    )
                }
            </div>
        </header>
         </>
    )
}

export default Header;