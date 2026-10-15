import express from "express";
import {
  createShortLink,
  getAllLinks,
  redirectToOriginalUrl
} from "../controllers/link.controller.js";

const router = express.Router();

router.post("/api/links", createShortLink);
router.get("/api/links", getAllLinks);
router.get("/:code", redirectToOriginalUrl);

export default router;
