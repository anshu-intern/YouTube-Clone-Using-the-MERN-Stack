import icon from '../assets/icons/userProfilePic.jpg';
import MainVideoCard from './MainVideoCard';

function VideoPlayPage(){
    return(
        <>
        <section className="relative h-[100%] w-[100%] flex justify-start items-start gap-5 py-5 px-[30px] overflow-scroll">
            <div className="relative h-[auto] w-3/4 flex flex-col justify-start gap-2 items-start">
                <div className="relative w-[100%] h-[auto] rounded-xl overflow-hidden">
                    <video src={"https://www.w3schools.com/html/mov_bbb.mp4"} controls className="relative w-[100%] h-[auto]"></video>
                </div>

                <span className="font-bold text-[20px]">Radha Rani Bhajan Mashup | The Brajkeepers | Radhashtami Special 2022</span>

                <div className="relative w-[100%] h-[auto] flex flex-row justify-between items-end pb-6">
                    <div className="flex flex-row justify-start items-center gap-8">
                        <div className="flex flex-col gap-0">
                            <span className="font-bold text-[14px]">Dhruv Sharma + Swarna Shri</span>
                            <span className="text-gray-500 text-[16px]">774 subscribers</span>
                        </div>
                        <span className="bg-black text-white rounded-3xl px-3 py-2 cursor-pointer text-[14px] font-medium">Subscribe</span>
                    </div>
                    <div className="flex justify-center items-center gap-3 px-2">
                        <div className="relative overflow-hidden">
                            <button className="relative h-[100%] border-r border-gray-400 px-6 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tl-3xl rounded-bl-3xl">Like</button>
                            <button className="relative h-[100%] px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tr-3xl rounded-br-3xl">Dislike</button>
                        </div>
                        <button className="px-5 py-2 bg-gray-100 rounded-3xl cursor-pointer hover:bg-gray-200">Share</button>
                    </div>
                </div>

                <div className="relative w-[100%] h-[auto] flex flex-col gap-2">
                    <span className="text-[20px] font-bold">6,691 Comments</span>
                    <input type="text" placeholder="Add a comment..." className="relative w-[100%] outline-0 border-b-1"></input>
                    <div className="flex justify-between items-center">
                        <span className="text-[12px]">By completing this action you are creating a channel and agree to YouTube-clone's Terms of Service.</span>
                        <div className="flex gap-3">
                        <button className="text-[14px] font-medium px-3 py-2 rounded-3xl hover:bg-gray-200">Cancel</button>
                        <button className="text-[14px] font-medium px-3 py-2 rounded-3xl bg-gray-100 hover:bg-gray-200">Comment</button>
                        </div>
                    </div>

                    <div className="relative w-[100%] h-[auto] flex gap-4 justify-start pb-10">
                        <div className="relative h-[100%] w-[auto] overflow-hidden rounded-full">
                            <img src={icon} alt='icon' className='relative h-[100%] w-[100%]'/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>anshumanik</span>
                            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nisi modi, sapiente velit numquam pariatur quisquam minus a nam ut optio atque eaque dolorum placeat totam cum alias quaerat quo!</span>
                            <div className="flex justify-start items-center">
                                <button className="relative h-[100%] border-r border-gray-400 px-6 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tl-3xl rounded-bl-3xl">Like</button>
                                <button className="relative h-[100%] px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tr-3xl rounded-br-3xl">Dislike</button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <button className='border rounded-3xl px-3'>Modify</button>
                            <button className='border rounded-3xl px-3'>Delete</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="relative h-[auto] w-1/4 flex flex-col justify-start items-start border pt-10 px-2">
                <span className="font-medium pb-2">Related videos</span>
                
            </div>
        </section>
        </>
    )
}

export default VideoPlayPage;