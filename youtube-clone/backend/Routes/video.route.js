import express from 'express';
import { getVideo, getVideoById, addVideo, deleteVideoById, updateVideoById, toggleAddVideoLike, toggleAddVideoDisLike } from '../Controller/video.controller.js';
import authorise from '../Middleware/authorise.js';
import { uploadFields } from '../Middleware/storage.multer.js';

const router = express.Router();

router.get("/", getVideo);
router.get("/:video_id", getVideoById);
router.post("/upload", authorise, uploadFields(['video', 'thumbnail']), addVideo);
router.delete("/delete/:video_id", authorise, deleteVideoById);
router.patch("/update/:video_id", authorise, uploadFields(['thumbnail']), updateVideoById);
router.patch("/like/:video_id", authorise, toggleAddVideoLike );
router.patch("/dislike/:video_id", authorise, toggleAddVideoDisLike );

export default router;