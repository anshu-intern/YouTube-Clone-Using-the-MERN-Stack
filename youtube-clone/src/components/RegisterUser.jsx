import { useRef, useState } from 'react';
import icon from '../assets/icons/head_icon.png';
import userProfilePic from '../assets/icons/userProfilePic.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterUser(){
    const [loading, setLoading] = useState(true);
    const [ userName, setUserName ] = useState('');
    const [ userNameErr, setUserNameErr ] = useState(null);
    const [ email, setEmail ] = useState('');
    const [ emailErr, setEmailErr ] = useState(null);
    const [ password, setPassword ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState(null);
    const [ avatar, setAvatar ] = useState(null);
    const [ avatarPreview,setAvatarPreview ] = useState(null);
    const avatarRef = useRef(null);
    const navigate = useNavigate();

    async function handleRegisterClick(){
        if (userName.trim().length === 0){
            setUserNameErr("Username not entered");
            return
        }
        if ( email.trim().length === 0){
            setEmailErr("Email not entered");
            return
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailErr("Invalid email format.");
            return
        }
        if (password.trim().length === 0 ){
            setPasswordErr("Password not entered");
            return
        }
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("username", userName );
            formData.append("email" , email );
            formData.append("password", password);
            if (avatar){
                formData.append("avatar", avatar);
            }
            const resp = await axios.post("/api/user/register", formData);
            if(resp.status === 201){
                setUserName('');
                setEmail('');
                setPassword('');
                setAvatar(null);
                alert(resp.data.message);
                navigate("/login");
            }   
        } catch(err){
            if(err.response.status === 409){
                if(err.response.data.message.toLowerCase().includes("email")){
                    setEmailErr(err.response.data.message);
                } else {
                    setUserNameErr(err.response.data.message);
                }
            } else{
                alert("User registration failed. Please try after some time.");
            }
             setLoading(false);
        }
    }

    function handleLoginClick(){
        setLoading(true)
        setTimeout(() => navigate("/login"), 1500)
    }

    function handleHomepage(){
        setLoading(true)
        setTimeout(() => navigate("/"), 1500)
    }

    function handleAvatar(e){
        setAvatar(null);
        setAvatarPreview(null);
        if (e.target.files[0]){
            setAvatar(e.target.files[0])
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

    function handleUsernameInput(e){
        setUserNameErr(null);
        setUserName(e.target.value);
    }

    function handlePasswordInput(e){
        setPasswordErr(null);
        setPassword(e.target.value)
    }

    function handleEmailInput(e){
        setEmailErr(null);
        setEmail(e.target.value);
    }

    return(
        <section className="relative flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-10">
            {
                loading &&
                <div className='relative w-[1020px] max-w-[1020px]'>
                    <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-500'></span>
                </div>
            }
            <article className='flex flex-col justify-center items-center w-[1024px] max-w-[1024px] overflow-hidden bg-white p-6 rounded-2xl'>
                <div className='flex flex-row gap-4 justify-center items-start w-[100%] p-4'>
                    <img src={icon} alt='youtube_icon' className='h-[50px]'/>
                    <h1 className='text-[32px] font-bold '>Create a YouTube - clone Account</h1>
                </div>
                <div className='relative flex flex-col justify-center items-center gap-1 w-[50%] py-6'>
                    <div className='flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 pt-3 pb-3 px-8 rounded-xl' onClick={()=> avatarRef.current.click()}>
                        { !avatarPreview && <img src={userProfilePic} alt="image" className='h-[150px] w-[150px] rounded-full'/> }
                        { avatarPreview && <img src={avatarPreview} alt="image" className='h-[150px] w-[150px] rounded-full'/> }
                        <input ref={avatarRef} type="file" accept='image/*' className='hidden' onChange={(e) => handleAvatar(e)}/>
                        { avatar?.name ? <div className='text-gray-500 h-[24px] text-[14px] p-2'>{avatar?.name}</div> : <div className='text-gray-500 h-[24px] text-[14px] p-2'>Set an avatar</div> }
                    </div>
                    

                    <label className='w-[100%]'>Username:</label>
                    <input type="text" className={`w-[100%] border p-1 rounded ${userNameErr ? 'border-2 border-red-600' : 'border' }`} required value={userName} onChange={(e)=> handleUsernameInput(e) }/>
                    <div className='text-gray-500 h-[24px] text-[14px] w-[100%] text-red-600'>{userNameErr}</div>

                    <label className='w-[100%]'>E-mail:</label>
                    <input type="email" className='w-[100%] border p-1 rounded' required value={email} onChange={(e)=> handleEmailInput(e) }/>
                    <div className='text-gray-500 h-[24px] text-[14px] w-[100%] text-red-600'>{emailErr}</div>

                    <label className='w-[100%]'>Password:</label>
                    <input type="password" className='w-[100%] border p-1 rounded' required value={password} onChange={(e)=> handlePasswordInput(e) }/>
                    <div className='text-gray-500 h-[24px] text-[14px] w-[100%] text-red-600'>{passwordErr}</div>

                </div>
                <div className='flex flex-col gap-0 justify-center items-center pb-2'>
                    <button className='bg-blue-700 text-white h-[40px] border-blue-700 rounded-3xl cursor-pointer hover:bg-blue-900 px-5' onClick={() => handleRegisterClick()}>Register user</button>
                    <button className='text-blue-700 text-[14px] cursor-pointer border-white bg-white hover:underline font-bold rounded-3xl h-[40px] px-3' onClick={() => handleLoginClick()}>Already have an account? Go back to login.</button>
                    <span className='underline cursor-pointer text-gray-500 text-[14px]' onClick={() => handleHomepage()}>Go to homepage.</span>
                </div>
            </article>
        </section>
    )
}

export default RegisterUser;