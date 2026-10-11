import express from "express";
import { createCup, getCups } from "../controllers/cup.controller.js";
const router = express.Router();
router.post("/", createCup);
router.get("/", getCups);
export default router;
