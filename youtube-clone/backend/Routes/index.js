import userRoute from "./user.route.js";
import videoRoute from "./video.route.js";

//Handle not defined || invalid routes
function invalidRoute(req,res,next){
    res.status(404).json({success: false, message:"Route not found."});
}

//Global error handler
function globalErrHandle(err,req,res,next){
    console.error(err.stack);
    res.status(err.statusCode || 500).json({success: false, message: err.message || "Internal Server Error."})
}

function routes(app){
    app.use("/api/user", userRoute);
    app.use("/api/video", videoRoute);

    //Handle invalid routes
    app.use(invalidRoute);

    //Global error handler
    app.use(globalErrHandle)
}

export default routes;