import { Link, useLocation, useNavigate } from "react-router-dom";
import monkey from '../assets/icons/monkey.png';
import icon from '../assets/icons/head_icon.png';
import serachicon from '../assets/icons/searchicon.png';
import { useState } from "react";

function Error(){
    const location = useLocation();
    const navigate = useNavigate();
    const [ search, setSearch ] = useState('');
    const errorUrl = location.state?.url || "Unknown error occurred";

    function handleSearch(){
        if(search.trim().length !== 0 ){
            navigate(`/?q=${encodeURIComponent(search.trim())}`);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center gap-2 bg-gray-100 h-[100vh] w-[100vw]">
            <img src={monkey} alt='monkey'/>
            <span className="text-gray-500 p-2">{errorUrl}</span>
            <div className="flex flex-col justify-center items-center gap-0">
                <span>This page isn't available. Sorry about that.</span>
                <span>Try searching for something else.</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-2">
                <div className="flex flex-row justify-around items-center gap-0">
                    <img src={icon} className="h-[40px]"/>
                    <Link to={"/"}>
                        <span className="font-bold cursor-pointer">YouTube<sup className="font-normal text-gray-500">clone</sup></span>
                    </Link>
                </div>
                <div className="flex flex-row">
                    <input type="text" className="border px-1 h-[30px]" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                    <button className="border bg-gray-300 w-[40px] px-2" onClick={() => handleSearch()}><img src={serachicon} className="h-[20px] w-[20px]"/></button>
                </div>
            </div>
        </div>
    )
}

export default Error;