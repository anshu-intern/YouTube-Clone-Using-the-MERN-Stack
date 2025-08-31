import express from 'express';
import { addChannel, getChannelById } from '../Controller/channel.controller.js';
import upload from '../Middleware/multer.js';
import authorise from '../Middleware/authorise.js';

const router = express.Router();

router.post("/", authorise, upload.none(), addChannel);
router.get("/:channel_id", authorise, getChannelById);

export default router;