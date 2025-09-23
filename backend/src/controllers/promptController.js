import { Prompt, User } from "../models/index.js";
// GET /api/prompts
export const getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.findAll();
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// POST /api/prompts
export const createPrompt = async (req, res) => {
    try {
        const prompt = await Prompt.create(req.body);
        res.status(201).json(prompt);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// PUT /api/prompts/:id
export const updatePrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.id);
        if (!prompt) return res.status(404).json({ error: "Prompt not found" });
        await prompt.update(req.body);
        res.json(prompt);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// DELETE /api/prompts/:id
export const deletePrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.id);
        if (!prompt) return res.status(404).json({ error: "Prompt not found" });
        await prompt.destroy();
        res.json({ message: "Prompt deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// PATCH /api/prompts/:id/usage
export const incrementUsage = async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.id);
        if (!prompt) return res.status(404).json({ error: "Prompt not found" });
        await prompt.update({
            usageCount: prompt.usageCount + 1,
            lastUsedAt: new Date(),
        });
        res.json(prompt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
