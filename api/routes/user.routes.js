import express from 'express';
import { test, UpdateUser } from '../controllers/user.controller.js'
import { veryfyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', veryfyToken, UpdateUser);

export default router;