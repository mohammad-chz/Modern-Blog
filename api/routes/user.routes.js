import express from 'express';
import { deleteUser, test, UpdateUser } from '../controllers/user.controller.js'
import { veryfyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', veryfyToken, UpdateUser);
router.delete('/delete/:userId', veryfyToken, deleteUser);

export default router;