import express from 'express';
import { auth } from "../middleware/auth.js";
import { createMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/create', auth, createMessage);
router.get('/lists', auth, getMessages);

export {router as messageRoute};