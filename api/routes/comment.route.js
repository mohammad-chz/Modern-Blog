import express from 'express';
import { createComment, deleteComment, editComment, getcomments, getPostComments, likeComment } from '../controllers/comment.controller.js';
import { veryfyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', veryfyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', veryfyToken, likeComment);
router.put('/editComment/:commentId', veryfyToken, editComment);
router.delete('/deleteComment/:commentId', veryfyToken, deleteComment);
router.get('/getcomments', veryfyToken, getcomments);

export default router;