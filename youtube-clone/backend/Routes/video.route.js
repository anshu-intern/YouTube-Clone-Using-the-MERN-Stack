import express from 'express';
import { getVideo, getVideoById } from '../Controller/video.controller.js';

const router = express.Router();

router.get("/", getVideo);
router.get("/:video_id", getVideoById);

export default router;