import express from 'express';
import { veryfyToken } from '../utils/verifyUser.js';
import { create, deletePost, getposts, updatepost } from '../controllers/post.controller.js';
import upload from '../utils/uploadMiddleware.js';

const router = express.Router();

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });
  });

router.post('/create', veryfyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', veryfyToken, deletePost);
router.put('/updatepost/:postId/:userId', veryfyToken, updatepost)

export default router;