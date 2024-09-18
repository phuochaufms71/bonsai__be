import express from 'express';
import { changePassword, editUser, getUser, login, logout, register, resetPassword } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
router.put('/edit', editUser);
router.get('/get-user', getUser);

export {router as authRoute};