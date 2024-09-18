import express from "express";
import { auth } from "../middleware/auth.js";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/addressController.js";

const router = express.Router();

router.get('/lists', auth, getAddresses);
router.post('/create', auth, createAddress);
router.put('/:id', auth, updateAddress);
router.delete('/:id', auth, deleteAddress);

export { router as addressRoute };