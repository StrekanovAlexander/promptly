import { Prompt, User } from "../models/index.js";
// GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserWithPrompts = async (req, res) => {
    try {
        const { id } = req.params;

        if (parseInt(id) !== req.user.userId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const user = await User.findByPk(id, {
            include: [{ model: Prompt, as: "prompts" }]
        });

        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};