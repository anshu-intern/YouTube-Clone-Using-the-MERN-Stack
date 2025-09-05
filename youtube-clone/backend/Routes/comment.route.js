import express from 'express';
import { addComment, modifyComment, deleteComment } from '../Controller/comment.controller.js';
import authorise from '../Middleware/authorise.js';
import { validateModifyCommentInput, validatePostCommentInput } from '../Middleware/comment.middleware.js';

const router = express.Router();

router.post("/", authorise, validatePostCommentInput, addComment);
router.patch("/:video_id/:comment_id", authorise, validateModifyCommentInput, modifyComment);
router.delete("/:video_id/:comment_id", authorise, deleteComment);

export default router;