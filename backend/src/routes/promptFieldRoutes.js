import { Router } from "express";
import { getAllPromptFields, getPromptFieldsByCategory } from "../controllers/promptFieldController.js";

const router = Router();

router.get("/", getAllPromptFields);
router.get("/category/:categoryId", getPromptFieldsByCategory);

export default router;