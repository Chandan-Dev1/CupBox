import express from "express";
import { createBox, getBoxes } from "../controllers/box.controller.js";
const router = express.Router();
router.post("/", createBox);
router.get("/", getBoxes);
export default router;
