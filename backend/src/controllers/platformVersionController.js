import { PlatformVersion } from "../models/PlatformVersion.js";
// GET /api/platform-versions
export const getAllPlatformVersions = async (req, res) => {
    try {
        const platformVersions = await PlatformVersion.findAll({
            attributes: ['id', 'name', 'platform', 'version', 'description', 'isAvailable'],
            where: { isActive: true },
        });
        res.json(platformVersions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};