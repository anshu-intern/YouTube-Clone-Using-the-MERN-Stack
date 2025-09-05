import dotenv from 'dotenv';
dotenv.config();

import userModel from "../Model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import { uploadCloud } from '../Middleware/storage.cloudinary.js';

// Register user.
export async function registerUser(req, res){
    try{
        const { username, email, password } = req.body;
        const avatarFile = req.files?.['avatar']?.[0];
        let result = null;

        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });

        if (existingUser){
            if (existingUser.email === email) {
                return res.status(409).json({ success : false , message : "Email already exists." });
            } else {
                return res.status(409).json({ success : false , message : "Username already exists." });
            }
        }

        if (avatarFile){
            const publicId = `${Date.now()}-${avatarFile.originalname.split('.')[0]}`;
            result = await uploadCloud(avatarFile.buffer, publicId, 'avatars','image');
        } 

        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt);
        
        const newUser = new userModel({
            username : username,
            email : email,
            password : hashPwd,
            avatar: result?.secure_url || null,
            avatar_id: result?.public_id || null
        });
        
        await newUser.save();

        return res.status(201).json({ success : true , message : "User registered successfully."});

    } catch(err){
        return res.status(500).json({ success : false , message : "Internal server error."});
    }
}

// Login user and generate token...
export async function loginUser(req, res){
    try{
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).populate({
            path: 'channels',
            select: '_id channelName'
        });

        if (!user) {
            return res.status(401).json({ success : false , message: "Invalid username or user not registered." });
        }

        const isPwdMatch = await bcrypt.compare(password, user.password);
        if (!isPwdMatch) {
            return res.status(401).json({ success : false , message: "Incorrect password." });
        }

        const payload = { userId: user._id, username: user.username , email: user.email , avatar: user.avatar , channels: user.channels , subs: user.subscribedChannels }
        const accessToken =  jwt.sign(payload, process.env.JWT_SECRET , {expiresIn: '1h'}); 

        return res.status(200).json({ success : true , message: "login successful", accessToken: accessToken});

    } catch(err){
        return res.status(500).json({ success: false , message: "Internal server error."});
    }
}


// Check user for login....
export async function checkLoginUserName(req, res){
    try{
        const { u } = req.params;
        const user = await userModel.findOne({ $or : [ {email: u}, { username : u } ] });
        if (!user) {
            return res.status(401).json({ success : false , message: "Invalid username or user not registered." });
        }
        return res.status(200).json({ success: true , user: user.username});
    } catch(err){
        return res.status(500).json({ success: false , message: "Internal server error."});
    }
}

// Get user details.
export async function getUserData(req, res){
    try{
        const user = await userModel.findById(req.user_id).populate({
            path: 'channels',
            select: '_id channelName'
        });

        const data = { userId: user._id, username: user.username , email: user.email , avatar: user.avatar , channels: user.channels , subs: user.subscribedChannels };

        return res.status(200).json({ success: true , data: data});

    } catch(err){
        return res.status(500).json({ success: false , message: "Internal server error."});   
    }
}