import { Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../assets/utils/userContext";

function ProtectedRoute({children}) {
    const { loggedInUser, loading } = useContext(userContext);

    if(loading){
        return <div>Loading...</div>
    }

    if (!loggedInUser) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;
