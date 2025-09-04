import MainVideoCard from "./MainVideoCard";
import { useContext, useEffect, useState } from "react";
import userContext from "../assets/utils/userContext";
import axios from 'axios';
import { useLocation } from "react-router-dom";

function MainBody(){
    const {loggedInUser} = useContext(userContext);
    const [ videos , setVideos ] = useState([]);
    const [ category, setCategory ] = useState([]);
    const [ filteredVid, setFilteredVid ] = useState([]);
    const [ activeCat, setActiveCat ] = useState("all");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('q');

    useEffect(() => {
        async function loadVideos() {
            try{
                const resp = await axios.get("/api/video/");
                setVideos(resp.data.data);
                setFilteredVid(resp.data.data);
                setCategory( [...new Set( resp.data.data.map( i => i.category).filter(cat => cat) )] );
            } catch(err){
                console.error(err);
            }  
        }    
        loadVideos();
    }, []);

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
            setActiveCat("all");
            setFilteredVid(videos);
            setCategory( [...new Set( videos.map( i => i.category).filter(cat => cat) )] );
            return
        }
        setActiveCat(e.target.value);
        setFilteredVid(videos.filter( i => i.category === e.target.value));
    }
    
    return(
        <>
        <section className="relative flex flex-col justify-start items-start gap-4 w-[100%] h-[100%] px-2">
            <div className="relative sticky top-0 h-[auto] w-[100%] flex flex-row shrink-0 flex-wrap justify-start items-start gap-3 px-4 py-3">
                { <button value='all' className={`px-3 py-[6px] rounded-xl ${activeCat === "all" ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-gray-300"} text-[16px] cursor-pointer`} onClick={ e => setFilter(e)}>All</button> }
                { category.map( (item, index) => (<button key={index} value={item} className={`px-3 py-[6px] rounded-xl ${activeCat === item ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-gray-300"} font-medium text-[14px] cursor-pointer`} onClick={ e => setFilter(e)}>{item}</button>)) }
            </div>
            <div className="relative h-[auto] w-[100%] flex flex-row flex-wrap gap-3 px-2 pb-10 overflow-scroll">
                { filteredVid?.length === 0 && <div className="w-[100%] text-center font-medium text-[20px]">Oops! No videos found...</div>}
                { filteredVid.map( (item, index) => ( <MainVideoCard key={item._id} value={item} /> )) }
            </div>
        </section>
        </>
    )
}

export default MainBody;