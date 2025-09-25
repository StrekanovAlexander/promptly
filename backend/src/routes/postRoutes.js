import { Router } from "express";
import { getAllPosts, getPost } from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);

export default router;