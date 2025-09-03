import express from 'express';
import { addComment, modifyComment, deleteComment } from '../Controller/comment.controller.js';
import authorise from '../Middleware/authorise.js';

const router = express.Router();

router.post("/", authorise, addComment);
router.patch("/:video_id/:comment_id", authorise, modifyComment)
router.delete("/:video_id/:comment_id", authorise, deleteComment);

export default router;