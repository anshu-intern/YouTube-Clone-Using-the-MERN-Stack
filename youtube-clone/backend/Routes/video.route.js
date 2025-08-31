import express from 'express';
import { getVideo, getVideoById, addVideo } from '../Controller/video.controller.js';
import authorise from '../Middleware/authorise.js';
import { uploadFields } from '../Middleware/video.multer.js';


const router = express.Router();

router.get("/", getVideo);
router.get("/:video_id", getVideoById);
router.post("/upload", authorise, uploadFields(['video', 'thumbnail']), addVideo);

export default router;