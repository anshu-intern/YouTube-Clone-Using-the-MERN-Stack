import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons/head_icon.png'
import serachicon from '../assets/icons/searchicon.png';
import { useState } from 'react';

function Header({toggleSideBar}){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSignIn(){
        setLoading(true);
        setTimeout(() => navigate("/login"),2000)
    }

    return(
        <>
        {
            loading && 
            <div className='relative z-20'>
                <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-500'></span>
            </div>
        }
        <header className="flex flex-row gap-2  h-[58px] items-stretch justify-between px-[20px] sticky top-0 pt-3 pb-1 z-10 bg-white">
            <div className="flex flex-row gap-3 h-[100%] items-center relative px-2 ">
                <nav className="flex flex-row h-[80%] items-center relative p-1.5">
                    <button className="flex flex-col gap-1.5 justify-center w-10 cursor-pointer p-[8px] hover:bg-gray-200 hover:rounded-full" onClick={toggleSideBar}>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                        <span className="block h-[1px] bg-black rounded"></span>
                    </button>
                </nav>
                <div className="flex flex-row h-[100%] items-center relative">
                    <img src={icon} alt={"youtube image"} className='h-[32px] cursor-pointer'></img>
                    <h1 className="text-l font-bold hover:cursor-pointer">YouTube<sup className='pl-[4px] text-s font-light'>clone</sup></h1>
                </div>
            </div>
            <div className='relative flex flex-row justify-center items-center h-[100%] border border-gray-500 rounded-3xl overflow-hidden'>
                <div className='relative h-[60%] pl-3'><img src={serachicon} alt='searchicon' className='relative h-[100%] overflow-hidden'/></div>
                <input type="text" name="search_query" placeholder="Search" className='relative w-[550px] h-[100%] focus:outline-none px-4 pl-5'/>
                <button className='relative h-[100%] px-2.5 border-l px-6 bg-gray-100 cursor-pointer hover:bg-gray-200'><img src={serachicon} alt='search icon' className='relative h-[60%] overflow-hidden'></img></button>
            </div>
            <div className="relative flex flex-row gap-3 h-[100%] items-center px-2">
                <button className="flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-gray-200 w-[40px] rounded-full p-2">
                    <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                    <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                    <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
                </button>
                <button className='relative border rounded-3xl px-3 text-blue-500 h-[90%] font-bold cursor-pointer hover:bg-blue-100 border-gray-300' onClick={handleSignIn}>Sign in</button>
            </div>
        </header>
         </>
    )
}

export default Header;