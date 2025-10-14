import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { runPrompt } from "../controllers/promptRunnerController.js";

const router = Router();

// POST /api/prompt-runner/run
// router.post("/run", authMiddleware, runPrompt);
router.post("/run", runPrompt);

export default router;