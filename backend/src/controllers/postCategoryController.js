import { PostCategory } from "../models/PostCategory.js";
// GET /api/post-categories
export const getAllPostCategories = async (req, res) => {
    try {
        const postCategories = await PostCategory.findAll({
            order: ['name']
        });
        res.json(postCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};