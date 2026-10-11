import express from "express";
import { getCupCapacity } from "../controllers/capacity.controller.js";
const router = express.Router();
router.post("/recommend", getCupCapacity);
export default router;
