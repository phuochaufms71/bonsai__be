import express from "express";
import { auth } from "../middleware/auth.js";

import { createReply, deleteReply, getReply, updateReply } from "../controllers/replyController.js";

const router = express.Router();

router.get('/:commentId', auth, getReply);
router.post('/create', auth, createReply);
router.put('/:id', auth, updateReply);
router.delete('/:id', auth, deleteReply);

export { router as replyRoute };