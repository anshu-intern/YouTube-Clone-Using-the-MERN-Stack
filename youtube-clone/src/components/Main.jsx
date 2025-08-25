import MainVideoCard from "./MainVideoCard";
import { useContext, useEffect, useState } from "react";
import userContext from "../assets/utils/userContext";
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Main(){
    const {loggedInUser} = useContext(userContext);
    const [ videos , setVideos ] = useState([]);
    const [ category, setCategory ] = useState([]);
    const [ filteredVid, setFilteredVid ] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('q');

    useEffect(() => {
        if(loggedInUser){
            async function loadVideos() {
                try{
                    const resp = await axios.get("http://localhost:3000/api/video");
                    console.log(resp.data.data);
                    setVideos(resp.data.data);
                    setFilteredVid(resp.data.data);
                    setCategory( [...new Set( resp.data.data.map( i => i.category).filter(cat => cat) )] );
                } catch(err){
                    console.error(err);
                }   
            }
            loadVideos();
        }
    }, [loggedInUser]);

    useEffect(() => {
        if(searchText){
            const filtered = videos.filter( v => v.title.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredVid(filtered);
            setCategory( [...new Set( filtered.map( i => i.category).filter(cat => cat) )] );
        }
        else{
            setFilteredVid(videos);
            setCategory( [...new Set( videos.map( i => i.category).filter(cat => cat) )] );
        }
    }, [searchText, videos]);
    
    function setFilter(e){
        if(e.target.value === 'all'){
            setFilteredVid(videos);
            return
        }
        setFilteredVid(videos.filter( i => i.category === e.target.value));
    }
    
    return(
        <>
        { !loggedInUser && (
        
        <section className="relative flex flex-row justify-center items-center pt-2 w-[50%] max-w-[750px]">
            <div className="relative w-[100%] border-white rounded-xl p-4 pt-8 shadow-xl">
                <h2 className="font-bold text-[24px] text-center p-2">Try searching to get started</h2>
                <p className="font-light text-[14px] text-center">Start watching videos to help us build a feed of videos you'll love.</p>
            </div>
        </section>
        )
        }
        {
            loggedInUser && (
        <section className="relative flex flex-col justify-start items-start gap-4 w-[100%] h-[100%] px-2">
            <div className="relative sticky top-0 h-[auto] w-[100%] flex flex-row shrink-0 flex-wrap justify-start items-start gap-3 px-4 py-3">
                { !searchText && <button value='all' className="px-3 py-[6px] rounded-xl bg-black text-white text-[16px]" onClick={ e => setFilter(e)}>All</button> }
                { category.map( (item, index) => (<button key={index} value={item} className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px] hover:bg-gray-300" onClick={ e => setFilter(e)}>{item}</button>)) }
            </div>
            <div className="relative h-[auto] w-[100%] flex flex-row flex-wrap gap-3 px-2 pb-10 overflow-scroll">
                { filteredVid.map( (item, index) => ( <MainVideoCard key={index} value={item} /> )) }
            </div>
        </section>
        )
        }
        </>
    )
}

export default Main;