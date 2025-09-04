import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

function authorise(req, res, next){

    if(!req.headers.authorization){
       return res.status(401).json({success: false, message: "Authorization token missing."});
    }

    const parts = req.headers.authorization.split(' ');

    if (parts.length !== 2 || parts[0] !== 'JWT') {
        return res.status(401).json({success: false, message: "Invalid JWT token format."});
    }

    const token = parts[1];

    try{
        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        req.user_id = decoded.userId;
        next();
    } catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired." });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        return res.status(500).json({ success: false, message: "Token verification failed." });
    }
}

export default authorise;