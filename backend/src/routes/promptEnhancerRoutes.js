import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { enhancePrompt } from "../controllers/promptEnhancerController.js";

const router = Router();
router.post("/enhance", authMiddleware, enhancePrompt);

export default router;
