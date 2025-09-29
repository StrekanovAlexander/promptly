import express from "express";
import { githubCallback, googleCallback } from "../controllers/authController.js";

const router = express.Router();
router.get("/github/callback", githubCallback);
router.get("/google/callback", googleCallback);

export default router;