import { Platform } from "../models/Platform.js";
// GET /api/platforms
export const getAllPlatforms = async (req, res) => {
    try {
        const platforms = await Platform.findAll({
            where: { isActive: true },
        });
        res.json(platforms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};