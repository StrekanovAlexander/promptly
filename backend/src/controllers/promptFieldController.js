import { Category, PromptField } from "../models/index.js";
// GET /api/prompt-fields
export const getAllPromptFields = async (req, res) => {
    try {
        const promptFields = await PromptField.findAll({
            order: [['id', 'ASC']],
            include: [
                { model: Category, attributes: ['name', 'slug', 'icon', 'description'] },
            ]
        });
        res.json(promptFields);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPromptFieldsByCategory = async (req, res) => {
    try {
        const promptFields = await PromptField.findAll({
            where: { categoryId: req.params.categoryId },
            order: [['id', 'ASC']],
            include: [
                { model: Category, attributes: ['name', 'slug', 'icon', 'description'] },
            ]
        });
        res.json(promptFields);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
