import { useRef, useState } from 'react';
import uploadVideo from '../assets/icons/uploadVideo.gif';
import uploadVideoThumb from '../assets/icons/uploadVideoThumb.png';

function AddVideoToChannel({add, cancel}){
    const uploadVideoRef = useRef(null);
    const uploadVideoThumbRef = useRef(null);
    const [ err, setErr ] = useState("");
    const [ title, setTitle ] = useState(null);
    const [ titleErr, setTitleErr ] = useState(false);
    const [ desc, setDesc ] = useState(null);
    const [ descErr, setDescErr ] = useState(false);
    const [ cat, setCat ] = useState(null);
    const [ catErr, setCatErr ] = useState(false);
    const [ vid, setVid ] = useState(null);
    const [ vidErr, setVidErr ] = useState(false);
    const [ thumb, setThumb ] = useState(null);
    const [ thumbErr, setThumbErr ] = useState(false);
    const [ vidPreview, setVidPreview ] = useState(null);
    const [ thumbPreview, setThumbPreview] = useState(null);

    function handleVideoClick(){
        uploadVideoRef.current.click();
    }

    function handleVideoThumbClick(){
        uploadVideoThumbRef.current.click();
    }

    function handleVideoFileChange(e){
        setVidErr(false);
        setErr("");
        setVidPreview(null);
        if(e.target.files[0]){
            setVid(e.target.files[0]);
            setVidPreview(URL.createObjectURL(e.target.files[0]));
            setThumb(null)
            setThumbPreview(null);
        }
    }

    function handleThumbFileChange(e){
        setThumbErr(false);
        setErr("");
        setThumbPreview(null);
        if(e.target.files[0]){
            setThumb(e.target.files[0])
            setThumbPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function setTitleValue(e){
        setErr("");
        setTitleErr(false);
        setTitle(e.target.value);
    }

    function setDescValue(e){
        setDescErr(false);
        setErr("");
        setDesc(e.target.value);
    }

    function setCatValue(e){
        setCatErr(false);
        setErr("");
        setCat(e.target.value);
    }

    function handleUploadData(){
        if (!vid){
            setVidErr(true);
            setErr("Select a video to upload!");
            return;
        }
        if (!thumb){
            setThumbErr(true);
            setErr("Select video thumbnail!");
            return;
        }
        if (!title){
            setTitleErr(true);
            setErr("Video title not set!");
            return;
        }
        if (!desc){
            setDescErr(true);
            setErr("Video description not set!");
            return;
        }
        if (!cat){
            setCatErr(true);
            setErr("Video category not set!");
            return;
        }

        add({
            videoFile: vid,
            thumbFile: thumb,
            title: title,
            description: desc,
            category: cat
        });
    }

    return(
        <div className='relative w-[900px] border flex flex-col justify-center items-center gap-4 p-10 rounded-xl shadow-2xl bg-white'>
            <span className="w-[100%] text-[28px] font-medium">Upload a video to YouTube<sup className='font-light text-gray-500'>clone</sup>...</span>
            <span className="w-[80%] text-[20px] font-medium py-1">Step 1: Select a video</span>
            <div className={`relative h-[auto] flex flex-col justify-center items-center py-1 cursor-pointer w-[30%] border  py-4 hover:bg-blue-100 rounded ${ vidErr ? 'border-red-500 bg-red-100': 'border-white'}`} onClick={handleVideoClick}>
                { !vidPreview && <><img src={uploadVideo} className='relative h-[100px]'/>
                <span>Select your video</span></>}
                { vidPreview && <><video src={vidPreview} className='relative h-[100px]'/><span>{vid.name}</span><span className='text-gray-500 text-[14px] pt-1'>change selected video</span></>}
                <input type='file' accept="video/*" ref={uploadVideoRef} className='hidden' onChange={handleVideoFileChange}/>
            </div>
            <div className={`relative h-[auto] flex flex-col justify-center items-center py-1 cursor-pointer border ${ thumbErr ? 'border-red-500 bg-red-100': 'border-white'} w-[30%] p-1 hover:bg-blue-100 rounded`} onClick={handleVideoThumbClick}>
                { !thumbPreview && <><img src={uploadVideoThumb} className='relative h-[100px]'/>
                <label>Select your video thumbnail</label></>}
                { thumbPreview && <><img src={thumbPreview} className='relative h-[100px]'/><span>{thumb.name}</span><span className='text-gray-500 text-[14px] pt-1'>change selected thumbnail</span></>}
                <input type='file' accept="image/*" ref={uploadVideoThumbRef} className='hidden' onChange={handleThumbFileChange}/>
            </div>
            
            <span className="w-[80%] text-[20px] font-medium py-1">Step 2: Enter details for the video</span>
            <input type="text" placeholder="Enter video title..." className={`w-[80%] p-2 rounded ${titleErr? "border-2 border-red-600" : "border"}`} onChange={(e) => setTitleValue(e)}/>
            <textarea placeholder="Enter video description..." rows="4" className={`w-[80%] p-2 rounded ${descErr? "border-2 border-red-600" : "border"}`} onChange={(e) => setDescValue(e)}/>
            <input type="text" placeholder="Enter video category..." className={`w-[80%] p-2 rounded ${catErr? "border-2 border-red-600" : "border"}`} onChange={(e) => setCatValue(e)}/>
            <span className='text-red-500 h-[30px]'>{err}</span>
            <div className="flex justify-center items-center gap-2 py-2">
            <button onClick={() => cancel(false)} className="w-[100px] px-3 py-2 bg-black text-white rounded-3xl">Cancel</button>
            <button onClick={handleUploadData} className="w-[100px] px-3 py-2 bg-black text-white rounded-3xl">Add</button>
            </div>
        </div>
    )
}

export default AddVideoToChannel;