import express from "express";
import { auth } from "../middleware/auth.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get('/lists', auth, getOrders);
router.post('/create', auth, createOrder);
// router.put('/:id', auth, updateAddress);
// router.delete('/:id', auth, deleteAddress);

export { router as orderRoute };