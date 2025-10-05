import { Router } from "express";
import { generateSitemap } from "../controllers/sitemapController.js";

const router = Router();

router.get("/", generateSitemap);

export default router;