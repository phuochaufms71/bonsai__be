import express from "express";
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createBonsai, deleteBonsai, getBonsaiDetail, getBonsais, updateBonsai } from "../controllers/bonsaiController.js";

const router = express.Router();

router.get("/manage/bonsai/lists", getBonsais);
router.get("/shopping/:id", getBonsaiDetail);
router.post("/manage/bonsai/create", authAdmin ,createBonsai);
router.put("/manage/bonsai/lists/:id", authAdmin, updateBonsai);
router.delete("/manage/bonsai/lists/:id", authAdmin, deleteBonsai);

export {router as bonsaiRoute};