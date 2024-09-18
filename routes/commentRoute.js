import express from "express";
import { auth } from "../middleware/auth.js";
import { createComment, getComments, updateComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.get('/:bonsaiId', auth, getComments);
router.post('/create', auth, createComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

export { router as commentRoute };