import { Router } from "express";
import { getAllPostCategories } from "../controllers/postCategoryController.js";

const router = Router();

router.get("/", getAllPostCategories);

export default router;