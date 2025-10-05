import { Category } from "../models/Category.js";
// GET /api/categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { isActive: true },
            order: ['name']
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
