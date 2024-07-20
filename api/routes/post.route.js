import express from 'express';
import { veryfyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', veryfyToken, create);
router.get('/getposts', getposts);

export default router;