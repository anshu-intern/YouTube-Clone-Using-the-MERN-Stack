import express from 'express';
import { loginUser, checkLoginUserName, registerUser, getUserData } from '../Controller/user.controller.js';
import authorise from '../Middleware/authorise.js';

const router = express.Router();

router.get("/user/:u", checkLoginUserName);
router.get("/data", authorise, getUserData);
router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;