import home_icon from '../assets/icons/home_icon.png'
import shorts_icon from '../assets/icons/shorts_icon.png'
import subscription_icon from '../assets/icons/subscription_icon.png'
import user_icon from '../assets/icons/user_icon.png'
import history_icon from '../assets/icons/history_icon.png'
import shopping_icon from '../assets/icons/shopping_icon.png'
import music_icon from '../assets/icons/music_icon.png'
import movies_icon from '../assets/icons/movies_icon.png'
import live_icon from '../assets/icons/live_icon.png'
import gaming_icon from '../assets/icons/gaming_icon.png'
import news_icon from '../assets/icons/news_icon.png'
import sports_icon from '../assets/icons/sports_icon.png'
import courses_icon from '../assets/icons/courses_icon.png'
import fashion_icon from '../assets/icons/fashion_icon.png'
import podcasts_icon from '../assets/icons/podcasts_icon.png'
import youtubepremium_icon from '../assets/icons/head_icon.png'
import youtubemusic_icon from '../assets/icons/youtubemusic_icon.png'
import youtubekids_icon from '../assets/icons/youtubekids_icon.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'


function Sidebar({collapseAsideBar, setcollapseAsideBar}){

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setcollapseAsideBar(true);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <aside className= {`relative flex flex-row justify-center items-center w-[100vw] sm:flex-col sm:justify-start sm:items-start sm:h-[100%] overflow-scroll lg:px-[14px] ${collapseAsideBar? 'p-0 sm:w-[80px] h-[70px] bg-gray-500 text-white sm:bg-white sm:text-black' : 'sm:max-w-[240px] h-[100px]'} `}>
            <div className ={`relative flex flex-row justify-center items-center sm:justify-start sm:items-start p-0 sm:flex-col gap-2 sm:gap-1 border-b border-gray-300 sm:w-[100%] sm:p-2 ${collapseAsideBar? 'border-none p-0 max-w-[80%]' : ''}`}>
                <Link to="/">
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%] ' : ''}`}>
                    <img src={home_icon} className= "h-[24px]"/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Home</span>
                </div>
                </Link>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={shorts_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Shorts</span>
                </div>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl  py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%] px-0' : 'px-4'}`}>
                    <img src={subscription_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Subscription</span>
                </div>
            </div>
            <div className={`relative flex flex-row justify-start items-center p-0 sm:flex-col sm:justify-start sm:items-start gap-3 sm:gap-1 border-b border-gray-300 sm:w-[100%] sm:p-2 ${collapseAsideBar? 'border-none p-0 max-w-[80%]' : ''}`}>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl  py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%] pl-5' : 'px-4'}`}>
                    <img src={user_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>You</span>
                </div>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl  py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%] pl-4 ' : 'px-4'}`}>
                    <img src={history_icon} className='h-[24px] w-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>History</span>
                </div>
            </div>
            {!collapseAsideBar && 
                <>
                <div className="relative flex flex-col gap-1 border-b border-gray-300 w-[100%] p-2">
                    <h2 className="font-[16px] font-bold pt-3">Explore</h2>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={shopping_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Shopping</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={music_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Music</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={movies_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Movie</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={live_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Live</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={gaming_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Gaming</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={news_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>News</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={sports_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Sports</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={courses_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Courses</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={fashion_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Fashion & Beauty</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={podcasts_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Podcasts</span>
                    </div>
                </div>
                <div className="relative flex flex-col gap-1 border-b border-gray-300 w-[100%] p-2">
                    <h2 className="text-l font-bold pt-3">More from YouTube</h2>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={youtubepremium_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>YouTube Premium</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={youtubemusic_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>YouTube Music</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={youtubekids_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>YouTube Kids</span>
                    </div>
                </div>
                <div className="relative flex flex-col gap-0 border-b border-gray-300 w-[100%] p-2">
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={history_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Settings</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={history_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Report history</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={history_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Help</span>
                    </div>
                    <div className='flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer'>
                        <img src={history_icon} className='h-[24px]'/>
                        <span className='font-light text-[14px]'>Send feedback</span>
                    </div>
                </div>
                <div className="relative flex flex-row flex-wrap gap-2 w-[100%] p-3 text-sm ">
                    <span>About</span>
                    <span>Press</span>
                    <span>Copyright</span>
                    <span>Contact us</span>
                    <span>Creators</span>
                    <span>Advertise</span>
                    <span>Developers</span>
                </div>
                <div className="relative flex flex-row flex-wrap gap-2 w-[100%] p-3 text-sm">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Policy & Safety</span>
                    <span>How YouTube-clone works</span>
                    <span>Test new features</span>
                </div>
                <div className="relative flex flex-row flex-wrap gap-1 w-[100%] p-4 text-sm">
                    <span className='text-[14px]'>© 2025 Youtube-clone LLC.</span>
                </div>
                </>
            }
        </aside>
    )
}

export default Sidebar;