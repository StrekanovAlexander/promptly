import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUsers, getUserWithPrompts } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", authMiddleware, getUserWithPrompts);

export default router;