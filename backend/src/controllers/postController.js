import { Post } from "../models/Post.js";
// GET /api/post-categories
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: ['updatedAt']
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const asset = await Post.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ error: 'Post not found' });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};