import { useState } from 'react';
import icon from '../assets/icons/head_icon.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterUser(){
    const [loading, setLoading] = useState(true);
    const [formLoad, setFormLoad] = useState(true);
    const navigate = useNavigate();
    const register_url = "https://docs.google.com/forms/d/1FIX9NU9ee4rps1BxxCe4X0-LXcj8J38gtXdim1dmsq4/viewform?edit_requested=true";

    function hideLoader(){
        setFormLoad(false)
        setLoading(false)
    }

    async function handleRegisterClick(){
        setLoading(true);
        const resp = await axios.post("http://localhost:3000/api/user/register");
        if(resp.status !== 201){
            alert("user registered aborted.")
        }
        alert(`${resp.status} user registered successfully.`)
        navigate("/login");
    }

    function handleLoginClick(){
        setLoading(true)
        setTimeout(() => navigate("/login"), 2000)
    }

    function handleHomepage(){
        setLoading(true)
        setTimeout(() => navigate("/"), 2000)
    }

    return(
        <section className="relative flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-10">
            {
                loading &&
                <div className='relative w-[1020px] max-w-[1020px]'>
                    <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-500'></span>
                </div>
            }
            <article className='flex flex-col justify-center items-center w-[1024px] max-w-[1024px] h-[100%] overflow-hidden bg-white p-6 rounded-2xl'>
                <div className='flex flex-row gap-4 justify-center items-start w-[100%] p-4'>
                    <img src={icon} alt='youtube_icon' className='h-[50px]'/>
                    <h1 className='text-[32px] font-bold '>Create a YouTube - clone Account</h1>
                </div>
                <div className='relative flex justify-center items-center w-[100%] h-[100%] py-6'>
                    {
                        formLoad &&
                        <div className='absolute top-0 h-[100%] w-[100%] bg-white border-2 z-10 overflow-hidden'>
                            <span className='text-xl font-bold p-2 bg-red-100'>Please wait. Loading form...</span>
                        </div>
                    }
                    <iframe src={register_url} onLoad={hideLoader} className='relative h-[100%] w-[100%] border rounded '></iframe>
                </div>
                <div className='flex flex-col gap-0 justify-center items-center py-2'>
                    <button className='bg-blue-700 text-white h-[40px] border-blue-700 rounded-3xl cursor-pointer hover:bg-blue-900 px-5' onClick={handleRegisterClick}>Register user</button>
                    <button className='text-blue-700 text-[14px] cursor-pointer border-white bg-white hover:underline font-bold rounded-3xl h-[40px] px-3' onClick={handleLoginClick}>Already have an account? Go back to login.</button>
                    <span className='underline cursor-pointer text-red-500' onClick={handleHomepage}>Go to homepage.</span>
                </div>
            </article>
        </section>
    )
}

export default RegisterUser;