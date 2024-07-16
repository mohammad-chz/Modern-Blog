import express from 'express';
import { veryfyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', veryfyToken, create);

export default router;