import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Main from './components/main';
import VideoPlayerPage from './components/VideoPlayPage.jsx'
import ChannelHome from './components/ChannelHome.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import userContext from './assets/utils/userContext';
import { jwtDecode } from 'jwt-decode';

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Main/>
      },
      {
        path: "channel",
        element: <ProtectedRoute><ChannelHome/></ProtectedRoute>
      },
      {
        path: "watch",
        element: <VideoPlayerPage/>
      }
    ]
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "register",
    element: <RegisterUser/>
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
