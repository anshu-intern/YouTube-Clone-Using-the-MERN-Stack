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
    <section className='flex m-0 p-0'>
       <Sidebar collapseAsideBar={collapseAsideBar}/>
       <div className='flex flex-row justify-center items-start w-[100%]'>
          <Main/>
       </div>
    </section>
    </>
  )
}
 
export default App;