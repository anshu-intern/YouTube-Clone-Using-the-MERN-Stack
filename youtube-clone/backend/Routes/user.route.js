import express from 'express';
import { loginUser, loginUserName, registerUser } from '../Controller/user.controller.js';

const router = express.Router();

router.get("/user/:u", loginUserName);
router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;