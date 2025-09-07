import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons/head_icon.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import userContext from '../assets/utils/userContext';
import { jwtDecode } from 'jwt-decode';

function Login(){
    const [loading,setLoading] = useState(false);
    const [UserName, setUserName] = useState('');
    const [UserNameErr, setUserNameErr] = useState(null);
    const [Password, setPassword] = useState('');
    const [PasswordErr, setPasswordErr] = useState(null);
    const [next, setNext] = useState(false);
    const { loggedInUser, setLoggedInUser } = useContext(userContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(loggedInUser){
            navigate("/");
        }
    }, [loggedInUser]);

    function handleCreateAccount(){
        setLoading(true)
        navigate("/register");
    }

    function handleUserNameInput(e){
        setUserName(e.target.value);
        setUserNameErr(null);
    }

    function handlePasswordInput(e){
        setPassword(e.target.value);
        setPasswordErr(null);
    }

    //api to check if username is vaild or not
    async function handleNext(){
        try{
            setLoading(true);
            const resp = await axios.get(`/api/user/user/${UserName}`);
            setUserNameErr(null);
            setUserName(resp.data.user);
            setNext(true);
        } catch(err){
            if(err.status === 500){
                alert(err.message);
            } else{
                setUserNameErr(err.response.data.message);
            }
            setNext(false);
        } finally{
            setLoading(false);
        }
    }

    //api to login user
    async function handleLogin(){
        try{
            setLoading(true);
            const resp = await axios.post(`/api/user/login`,{ username: UserName , password: Password });
            setPasswordErr(null);
            localStorage.setItem('Token', resp.data.accessToken);
            const decoded = jwtDecode(resp.data.accessToken);
            setLoggedInUser(decoded);
        } catch(err){
            setPasswordErr(err.response.data.message);
            if(err.status === 500){
                alert(err.message);
            }
        } finally{
            setLoading(false);
        }
    }

    function handleGoBack(){
        setPassword('');
        setPasswordErr(null);
        setNext(!next);
    }

    return(
        <section className="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-slate-100 overflow-hidden">
            { 
                loading &&
                <div className='relative w-[100%] lg:w-[1020px] lg:max-w-[1020px]'>
                    <span className='absolute top-0 left-0 w-[100%] h-[4px] bg-gradient-to-r from-blue-500 via-green-400 to-red-500 transition-all duration-1000'></span>
                </div>
            }
            <article className='flex flex-col lg:flex-row justify-center items-start lg:w-[1024px] lg:h-[380px] max-w-[1024px] lg:max-h-[380px] overflow-hidden bg-white p-6 rounded-2xl'>
                <div className='flex flex-col gap-2 justify-start items-start lg:w-[50%] border-red-900 p-4'>
                    <img src={icon} alt='youtube_icon' className='h-[50px]'/>
                    <h1 className='text-[40px] font-medium'>{ next ? "Welcome" : "Sign in" }</h1>
                    <span className={`text-[16px] ${ next ? "font-medium" : " font-light"}`}>{ next ? `${UserName}` : "to continue to YouYube - clone" }</span>
                </div>
                <div className= {`flex flex-col gap-9 justify-center items-start lg:w-[50%] h-[100%] p-4 overflow-hidden transition-all duration-500 ease-in-out ${ next ? 'hidden pointer-events-none' : ' ' }`}>
                    <div className='relative w-[100%]'>
                        <input type='text' placeholder='' id='name' value={UserName} className={`peer outline-1 rounded p-3 w-[100%] focus:outline-2 focus:outline-blue-700 ${ UserNameErr ? 'outline-red-700 outline-2' : 'outline-blue-700' }`}  onChange={ e => handleUserNameInput(e)}></input>
                        <label htmlFor="name" className="absolute left-4 px-1 -top-3.5 bg-white text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-700 peer-focus:bg-white peer-focus:px-1">Username or email</label>
                        <div className='text-red-600 text-[14px] h-[20px] px-1 py-1'>{UserNameErr}</div>
                    </div>
                    <p className='text-[14px]'>Not your computer? Use a Private Window to sign in.</p>
                    <div className='flex flex-row gap-6 justify-end items-center w-[100%]'>
                        <div>
                            <span className='text-[12px]'>Don't have an account?</span>
                            <button className='text-blue-700 text-[14px] cursor-pointer border-white bg-white hover:bg-gray-200 rounded-3xl h-[40px] px-3' onClick={handleCreateAccount}>Create account</button>
                        </div>
                        <button className={`bg-blue-700 text-white w-[78px] h-[40px] border-blue-700 rounded-3xl px-3 ${UserName.trim().length === 0 ? "pointer-events-none" :"hover:bg-blue-900 cursor-pointer"}`} onClick={handleNext} disabled={UserName.trim().length === 0}>Next</button>
                    </div>
                </div>
                <div className= {`flex flex-col gap-9 justify-center items-start lg:w-[50%] h-[100%] p-4 overflow-hidden transition-all duration-500 ease-in-out ${ !next ? ' hidden pointer-events-none' : '' }`}>
                    <div className='relative w-[100%]'>
                        <input type='password' placeholder='' id='password' value={Password} className='peer outline-1 rounded p-3 w-[100%] focus:outline-2 focus:outline-blue-700' onChange={ e => handlePasswordInput(e)}></input>
                        <label htmlFor="password" className="absolute px-1 left-4 -top-2.5 bg-white text-gray-600 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-700 peer-focus:bg-white peer-focus:px-1">Password</label>
                        <div className='text-red-600 text-[14px] h-[20px] px-1 py-1'>{PasswordErr}</div>
                    </div>
                    <div className='flex flex-row gap-6 justify-end items-center w-[100%]'>
                        <span className='text-blue-500 cursor-pointer hover:underline' onClick={() => handleGoBack()}>Go back</span>
                        <button className={`bg-blue-700 text-white w-[78px] h-[40px] border-blue-700 rounded-3xl px-3 ${Password.trim().length === 0 ? "pointer-events-none" : "cursor-pointer hover:bg-blue-900"}`} onClick={handleLogin} disabled={Password.trim().length === 0 }>Login</button>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Login;