import express from 'express';
import { createComment, getPostComments } from '../controllers/comment.controller.js';
import { veryfyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', veryfyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;