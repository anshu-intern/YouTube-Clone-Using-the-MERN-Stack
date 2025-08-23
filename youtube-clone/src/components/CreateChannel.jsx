import userProfilePic from '../assets/icons/userProfilePic.jpg'

function CreateChannel({cancel , create}){
    
    return(
        <>
        <div className="relative bg-white shadow-2xl rounded-xl w-[100%] max-w-[750px] p-2">
            <h1 className="text-[20px] font-bold px-4">How you'll appear</h1>
            <div className=" relative flex flex-col justify-center items-center gap-4 w-[100%] px-36 py-10">
                <img src={userProfilePic} alt='' className="rounded-full h-[120px] w-[120px]"/>
                <button className="px-4 py-2 rounded-3xl text-[14px] text-blue-600 hover:bg-blue-100">Select picture</button>
                <div className="relative w-[100%]">
                    <input id='channelusername' type='text' placeholder=" " className="peer border border-gray-300 rounded w-[100%] h-[50px] pt-6 px-2 pb-2"/>
                    <label htmlFor="channelusername" className="absolute top-1 left-2 text-[12px] text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:text-blue-600 peer-focus:text-[12px] peer-placeholder-shown:top-5 peer-placeholder-shown:text-[16px]">Name</label>
                </div>
                <div className="relative w-[100%]">
                    <input id='channelusername' type='text' placeholder=" " className="peer border border-gray-300 rounded w-[100%] h-[50px] pt-6 px-2 pb-2"/>
                    <label htmlFor="channelusername" className="absolute top-1 left-2 text-[12px] text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:text-blue-600 peer-focus:text-[12px] peer-placeholder-shown:top-5 peer-placeholder-shown:text-[16px]">Handle</label>
                </div>
                <span className="pt-10 text-[10px] text-gray-500">By clicking Create Channel you agree to YouTube-clone's Terms of Service. Changes made to your name and profile picture are visible only on YouTube-clone. Learn more</span>
            </div>
            <div className="relative flex flex-row justify-end items-end gap-2 text-[14px]">
                <button className="px-4 py-2 rounded-3xl hover:bg-gray-200" onClick={cancel}>Cancel</button>
                <button className="px-4 py-2 rounded-3xl text-blue-600 hover:bg-blue-100" onClick={create}>Create channel</button>
            </div>
        </div>
        </>
    )
}

export default CreateChannel;