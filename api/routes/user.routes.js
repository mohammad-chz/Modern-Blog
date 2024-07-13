import express from 'express';
import { deleteUser, signout, test, UpdateUser } from '../controllers/user.controller.js'
import { veryfyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', veryfyToken, UpdateUser);
router.delete('/delete/:userId', veryfyToken, deleteUser);
router.post('/signout', signout); 

export default router;