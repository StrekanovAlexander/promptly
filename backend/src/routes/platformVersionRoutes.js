import { Router } from "express";
import { getAllPlatformVersions } from "../controllers/platformVersionController.js";

const router = Router();

router.get("/", getAllPlatformVersions);

export default router;