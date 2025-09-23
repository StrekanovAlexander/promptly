import { Router } from "express";
import {
    getAllPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    incrementUsage,
} from "../controllers/promptController.js";

const router = Router();

router.get("/", getAllPrompts);
router.post("/", createPrompt);
router.put("/:id", updatePrompt);
router.delete("/:id", deletePrompt);
router.patch("/:id/usage", incrementUsage);

export default router;
