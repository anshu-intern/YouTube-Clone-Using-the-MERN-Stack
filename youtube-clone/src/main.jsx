import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login.jsx'
import MainBody from './components/MainBody.jsx'
import VideoPlayerPage from './components/VideoPlayPage.jsx'
import ChannelHome from './components/ChannelHome.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import userContext from './assets/utils/userContext';
import { jwtDecode } from 'jwt-decode';
import Error from './components/Error.jsx';

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <MainBody/>,
      },
      {
        path: "channel/:channel_id",
        //element: <ProtectedRoute><ChannelHome/></ProtectedRoute>,
        element: <ChannelHome/>
      },
      {
        path: "watch/:video_id",
        element: <VideoPlayerPage/>
      }
    ],
    errorElement: <Error/>
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <Error/>
  },
  {
    path: "register",
    element: <RegisterUser/>,
    errorElement: <Error/>
  },
  {
    path: "error",
    element: <Error/>
  }
]);

function Root() {
  const [logInUser, setLogInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token){
      try{
        const decoded = jwtDecode(token);
        setLogInUser(decoded);
      } catch(err){
        console.error(err);
        localStorage.removeItem('Token');
      }
    }
    setLoading(false); 
  }, []);

  return (
    <userContext.Provider value={{loggedInUser : logInUser, setLoggedInUser : setLogInUser, loading}}>
      <RouterProvider router={appRoute} />
    </userContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root/>
  </StrictMode>,
)