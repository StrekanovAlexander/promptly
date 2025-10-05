import { Router } from "express";
import { generateSitemap } from "../controllers/sitemapController.js";

const router = Router();

router.get("/generate", generateSitemap);

export default router;