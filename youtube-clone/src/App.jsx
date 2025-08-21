import { useState } from 'react';
import './app.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/main';

function App(){
  const [collapseAsideBar, setcollapseAsideBar] = useState(false);

  function toggleSideBar(){
    setcollapseAsideBar(!collapseAsideBar);
  }

  return(
    <>
    <Header toggleSideBar={toggleSideBar} />
    <section className='relative flex flex-row m-0 p-0 h-[calc(100vh-58px)] w-[100%] overflow-scroll'>
       <Sidebar collapseAsideBar={collapseAsideBar}/>
       <div className='relative flex flex-row justify-center items-start w-[100%] h-[100%]'>
          <Main/>
       </div>
    </section>
    </>
  )
}
 
export default App;