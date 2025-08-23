import dotenv from 'dotenv';
dotenv.config();

import userModel from "../Model/user.model.js";
import jwt from'jsonwebtoken';

export async function registerUser(req, res){
    try{
        const API = `${process.env.GSX2JSON}?id=${process.env.S_ID}&sheet=${process.env.S_NAME}`;
        const response = await fetch(API);
        console.log(response);
        if(response.status != 200) return res.status(response.status).json({statusText: response.statusText});

        const resp = await response.json();
        console.log(resp);
        
        const rows = resp?.rows || [];
        console.log(rows);
        for (const e of rows) {
            try{
                const {Email , Name, Password, Timestamp } = e ;
                console.log(e);
                if (!Email || !Name || !Password) continue;
                const exists = await userModel.findOne({ $or : [ {email: Email}, {username: Name} ] });

                if(!exists){
                    const newUser = new userModel({
                        username : Name,
                        email : Email,
                        password : Password
                    });
                    await newUser.save();
                }
            } catch(err){
                console.error(`Error processing row for Email: ${e.Email}, Name: ${e.Name}`, err);
            }  
        }

        res.status(201).json({success : true , message : "User registered successfully."});

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function loginUser(req, res){
    try{
        const {username, password} = req.body;

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or user not registered." });
        }

        const isPwdMatch = await user.comparePassword(password);
        if (!isPwdMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const payload = { username: user.username , email: user.email}
        const accessToken =  jwt.sign(payload, process.env.JWT_SECRET , {expiresIn: '15m'}); 

        res.status(200).json({message: "login successful",accessToken: accessToken});

    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}

export async function loginUserName(req, res){
    try{
        const { u } = req.params;
        const user = await userModel.findOne({ username : u });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or user not registered." });
        }
        res.status(200).json({sucess: true});
    } catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Internal server error."});
    }
}