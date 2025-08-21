import MainVideoCard from "./MainVideoCard";

function Main(){
    const login = true;
    return(
        <>
        { !login && (
        
        <section className="relative flex flex-row justify-center items-center pt-2 w-[50%] max-w-[750px]">
            <div className="relative w-[100%] border-white rounded-xl p-4 pt-8 shadow-xl">
                <h2 className="font-bold text-[24px] text-center p-2">Try searching to get started</h2>
                <p className="font-light text-[14px] text-center">Start watching videos to help us build a feed of videos you'll love.</p>
            </div>
        </section>
        )
        }
        {
            login && (
        <section className="relative flex flex-col justify-start items-start gap-4 w-[100%] h-[100%] px-2">
            <div className="relative sticky top-0 z-10 bg-white h-[auto] w-[100%] flex flex-row shrink-0 flex-wrap justify-start items-start gap-3 px-4 py-3">
                <button className="px-3 py-[6px] rounded-xl bg-black text-white text-[16px]">All</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">arijit singh</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">mixes</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">music</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">fashion and designing</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">vevo</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">bhakti</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">satsaang</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">chill-out music</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">All</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">All</button>
                <button className="px-3 py-[6px] rounded-xl bg-gray-200 text-black font-medium text-[14px]">chill-out music</button>
            </div>
            <div className="relative h-[auto] w-[100%] flex flex-row flex-wrap gap-3 px-2 pb-10 overflow-scroll">
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
                <MainVideoCard/>
            </div>
        </section>
        )
        }
        </>
    )
}

export default Main;