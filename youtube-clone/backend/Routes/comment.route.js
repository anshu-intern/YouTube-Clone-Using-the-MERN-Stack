import express from 'express';
import { addComment, modifyComment, deleteComment } from '../Controller/comment.controller.js';

const router = express.Router();

router.post("/", addComment);
router.patch("/:video_id/:comment_id", modifyComment )
router.delete("/:video_id/:comment_id", deleteComment);

export default router;