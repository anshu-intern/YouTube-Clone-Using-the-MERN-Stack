import express from 'express';
import { loginUser, checkLoginUserName, registerUser, getUserData } from '../Controller/user.controller.js';

const router = express.Router();

router.get("/user/:u", checkLoginUserName);
router.get("/user/u/:u", getUserData);
router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;