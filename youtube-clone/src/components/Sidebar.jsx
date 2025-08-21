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


function Sidebar({collapseAsideBar}){
    return(
        <aside className= {`relative flex flex-col justify-start items-start max-w-[240px] h-[100%] overflow-scroll px-[14px] ${collapseAsideBar? 'p-0' : ''} `}>
            <div className ={`relative flex flex-col gap-1 border-b border-gray-300 w-[100%] p-2 ${collapseAsideBar? 'border-none p-0 max-w-[80%]' : ''}`}>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={home_icon} className= "h-[24px]"/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Home</span>
                </div>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={shorts_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Shorts</span>
                </div>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={subscription_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>Subscription</span>
                </div>
            </div>
            <div className={`relative flex flex-col gap-1 border-b border-gray-300 w-[100%] p-2 ${collapseAsideBar? 'border-none p-0 max-w-[80%]' : ''}`}>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={user_icon} className='h-[24px]'/>
                    <span className={`font-light ${collapseAsideBar? 'text-[10px]' : 'text-[14px]'}`}>You</span>
                </div>
                <div className={`flex justify-start items-center gap-6 h-[38px] hover:bg-gray-100 rounded-xl px-4 py-2 cursor-pointer ${collapseAsideBar? 'flex-col gap-[6px] h-[100%]' : ''}`}>
                    <img src={history_icon} className='h-[24px]'/>
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
                    <span>How YouTube works</span>
                    <span>Test new features</span>
                </div>
                <div className="relative flex flex-row flex-wrap gap-1 w-[100%] p-4 text-sm">
                    <span>© 2025 Google LLC.</span>
                </div>
                </>
            }
        </aside>
    )
}

export default Sidebar;