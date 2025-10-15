import { Router } from "express";
import { getAllPromptFields } from "../controllers/promptFieldController.js";

const router = Router();

router.get("/", getAllPromptFields);

export default router;