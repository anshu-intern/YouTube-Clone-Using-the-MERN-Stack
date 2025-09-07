import { lazy, StrictMode, Suspense, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import MainBody from './components/MainBody.jsx'
import userContext from './assets/utils/userContext';
import { jwtDecode } from 'jwt-decode';

// Lazy loading for performance optimization...
const Login = lazy(() => import('./components/Login.jsx'));
const VideoPlayerPage = lazy(() => import('./components/VideoPlayPage.jsx'));
const ChannelHome = lazy(() => import('./components/ChannelHome.jsx'));
const RegisterUser = lazy(() => import('./components/RegisterUser.jsx'));
const Error = lazy(() => import('./components/Error.jsx'));

//Rouetes defined for the application.
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
        element: <Suspense><ChannelHome/></Suspense>
      },
      {
        path: "watch/:video_id",
        element: <Suspense><VideoPlayerPage/></Suspense>
      }
    ],
    errorElement: <Suspense><Error/></Suspense>
  },
  {
    path: "/login",
    element: <Suspense><Login/></Suspense>,
    errorElement: <Suspense><Error/></Suspense>
  },
  {
    path: "/register",
    element: <Suspense><RegisterUser/></Suspense>,
    errorElement: <Suspense><Error/></Suspense>
  },
  {
    path: "/error",
    element: <Suspense><Error/></Suspense>
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
    <userContext.Provider value={{loggedInUser : logInUser, setLoggedInUser : setLogInUser, load: loading, setLoad: setLoading }}>
      <RouterProvider router={appRoute} />
    </userContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root/>
  </StrictMode>,
)