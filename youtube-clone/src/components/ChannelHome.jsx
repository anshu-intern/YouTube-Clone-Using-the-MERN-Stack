import headicon from '../assets/icons/head_icon.png'

function ChannelHome(){
    return(
        <>
        <section className='relative flex justify-center items-center w-[100%] p-1'>
            <article className="relative flex flex-col gap-3 justify-center items-center w-[100%]">
                <div className='relative w-[100%] max-w-[1200px] rounded-2xl overflow-hidden p-2 bg-gray-300'>
                    <img src={headicon} alt='' className='relative h-[180px] w-[100%]'/>
                </div>
                <div className='relative w-[100%] max-w-[1200px] flex flex-row gap-4 overflow-hidden p-2'>
                    <img src={headicon} alt='' className='relative h-[180px] w-[180px] rounded-full overflow-hidden'/>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <span className='font-bold text-[32px]'>Internshala</span>
                        <div className='flex flex-row justify-start items-start gap-1'>
                            <span className='font-bold text-[14px]'>@Internshalaofficial</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>144K subs</span>
                            <span>.</span>
                            <span className='text-gray-500 text-[14px]'>685 videos</span>
                        </div>
                        <span className='text-gray-500 text-[14px]'>Welcome to official YouTube channel of Internshala.</span>
                        <div className='pb-1 text-[14px]'>
                            <span className='text-blue-500'>Internshala.com</span>
                            <span className='font-medium px-1'>and 5more links</span>
                        </div>
                        <button className='px-3 py-2 border border-black rounded-3xl bg-black text-white font-bold text-[14px]'>Subscribe</button>
                    </div>
                </div>
                <div className='relative h-[100%] w-[100%] text-[16px] font-medium text-gray-500 border-b border-gray-300'>
                    <div className='flex flex-row gap-6 justify-start items-center px-30'>
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
                    </div>
                </div>
                <div>
                    <h1>videos group</h1>
                </div>
            </article>
        </section>
        </>
    )
}

export default ChannelHome;