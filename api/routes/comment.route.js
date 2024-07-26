import express from 'express';
import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';
import { veryfyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', veryfyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', veryfyToken, likeComment);

export default router;