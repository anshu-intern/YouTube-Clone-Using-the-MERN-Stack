import userProfilePic from '../assets/icons/userProfilePic.jpg';

function MainVideoCard({}){
    return(
        <>
        <article className='relative flex flex-col justify-start items-start gap-1 p-1 w-[32%] h-[48%] min-h-[380px] overflow-hidden '>
            <div className='relative overflow-hidden w-[100%] h-[64%] rounded-xl '>
               <img src={userProfilePic} alt='video image' className='h-[100%] w-[100%]'/>
            </div>
            <span className='text-[16px] font-bold text-black'>Mix - Shree Ram Stuti | Sonika Sharma Agarwal | Ram Bhajan | Vickky Agarwal | Full Video - Lyrical</span>
            <span className='text-[14px] text-gray-500'>channel Sonika Sharma Agarwal, Vickky Agarwal, Religious India, and more</span>
            <span className='text-[14px] text-gray-500'>Updated today 133k views</span>
        </article>
        </>
    )
}

export default MainVideoCard;