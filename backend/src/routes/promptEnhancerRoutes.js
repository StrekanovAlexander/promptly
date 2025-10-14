import { Router } from "express";
import { enhancePrompt } from "../controllers/promptEnhancerController.js";

const router = Router();
router.post("/enhance", enhancePrompt);

export default router;
