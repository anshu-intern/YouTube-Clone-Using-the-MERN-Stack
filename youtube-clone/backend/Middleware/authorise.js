import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

function authorise(req, res, next){

    if(!req.headers.authorization){
       return res.status(401).json({message: "Authorization token missing."});
    }

    const [ scheme, token ] = req.headers.authorization.split(' ');

    if( scheme !== 'JWT' || !token ){
        return res.status(401).json({message: "Invalid JWT token format."});
    }

    try{
        const decoded = jwt.verify( token, process.env.JWT_SECRET );
        req.user_id = decoded.userId;
        next();
    } catch(err){
        return res.status(403).json({success: false, message: "Invalid token or expired token"});
    }
}

export default authorise;