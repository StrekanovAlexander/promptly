import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getAllPrompts,
    getPrompt,
    createPrompt,
    updatePrompt,
    deletePrompt,
    incrementUsage,
    getPromptsByUserId,
} from "../controllers/promptController.js";

const router = Router();

router.get("/", getAllPrompts);
router.get("/:id", getPrompt);
router.get("/user/:id", authMiddleware, getPromptsByUserId);
router.post("/", authMiddleware, createPrompt);
router.put("/:id", authMiddleware, updatePrompt);
router.delete("/:id", authMiddleware, deletePrompt);
router.patch("/:id/usage", authMiddleware, incrementUsage);

export default router;
