import { useEffect, useState } from 'react';
import './app.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { matchPath, Outlet, useLocation } from 'react-router-dom';

function App(){
  const [collapseAsideBar, setcollapseAsideBar] = useState(false);
  const location = useLocation();
  const isWatchPage = matchPath('/watch/:id', location.pathname);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 768) {
          setcollapseAsideBar(true);
        }
      }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  function toggleSideBar(){
    setcollapseAsideBar(!collapseAsideBar);
  }

  return(
    <>
    <Header toggleSideBar={toggleSideBar} />
    <section className='relative flex flex-col-reverse sm:flex-row m-0 p-0 h-[calc(100vh-58px)] w-[100%] overflow-scroll'>
       { !isWatchPage && <Sidebar collapseAsideBar={collapseAsideBar} setcollapseAsideBar={setcollapseAsideBar}/> }
       <div className='relative flex flex-row justify-center items-start w-[100%] h-[calc(100vh-58px)] overflow-y-scroll'>
          <Outlet/>
       </div>
    </section>
    </>
  )
}
 
export default App;