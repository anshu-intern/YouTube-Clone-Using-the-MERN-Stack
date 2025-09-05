import express from 'express';
import { loginUser, checkLoginUserName, registerUser, getUserData } from '../Controller/user.controller.js';
import authorise from '../Middleware/authorise.js';
import { uploadFields } from '../Middleware/storage.multer.js';
import { validateLoginInput, validateRegisterInput } from '../Middleware/user.middleware.js';

const router = express.Router();

router.get("/user/:u", checkLoginUserName);
router.get("/data", authorise, getUserData);
router.post("/login", validateLoginInput, loginUser);
router.post("/register", uploadFields(['avatar']), validateRegisterInput, registerUser);

export default router;