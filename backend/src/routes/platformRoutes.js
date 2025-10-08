import { Router } from "express";
import { getAllPlatforms } from "../controllers/platformController.js";

const router = Router();

router.get("/", getAllPlatforms);

export default router;