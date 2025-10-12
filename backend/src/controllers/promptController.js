import { Category, Platform, Prompt, PromptPlatform, UserPromptUsage } from "../models/index.js";
// GET /api/prompts
export const getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                { model: Category, attributes: ['name', 'slug', 'icon', 'description'] },
                { 
                    model: Platform, 
                    as: "platforms",
                    attributes: ["id", "name", "icon"], 
                    through: { attributes: [] }
                },
            ]
        });
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// GET /api/prompts/id
export const getPrompt = async (req, res) => {
    try {
        const prompt = await Prompt.findOne({
            where: { id: req.params.id },
            include: [
                { model: Category, attributes: ['name', 'slug', 'icon', 'description']},
                { 
                    model: Platform, 
                    as: "platforms",
                    attributes: ["id", "name", "icon"], 
                    through: { attributes: [] }
                },
            ],
        });
        res.json(prompt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/prompts/user/:id
export const getPromptsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const prompts = await Prompt.findAll({ where: { userId } });
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// POST /api/prompts
export const createPrompt = async (req, res) => {
    try {
        if (req.body.placeholders) {
            try {
                if (typeof req.body.placeholders === "string") {
                    req.body.placeholders = JSON.parse(req.body.placeholders);
                }
            } catch (err) {
                console.warn("Parsing placeholders error: ", err);
                req.body.placeholders = [];
            }
        }
        
        const {platforms, ...body} = req.body; 
        const prompt = await Prompt.create(body);

        if (platforms.length) {
            const platformsToInsert = platforms.map(el => ({
                prompt_id: prompt.id,
                platform_id: el
            }));
            await PromptPlatform.bulkCreate(platformsToInsert);
        }
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
        //
        if (req.body.placeholders) {
            try {
                if (typeof req.body.placeholders === "string") {
                    req.body.placeholders = JSON.parse(req.body.placeholders);
                }
            } catch (err) {
                console.warn("Parsing placeholders error: ", err);
                req.body.placeholders = [];
            }
        }

        const {platforms, ...body} = req.body; 
        await prompt.update(body);
        await PromptPlatform.destroy({ where: { prompt_id: prompt.id }});
        
        if (platforms.length) {
            const platformsToUpdate = platforms.map(el => ({
                prompt_id: prompt.id,
                platform_id: el
            }));
            
            await PromptPlatform.bulkCreate(platformsToUpdate);
        }
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
        const userId = req.user.userId;
        const promptId = req.params.id;

        const prompt = await Prompt.findByPk(promptId);
        if (!prompt) return res.status(404).json({ error: "Prompt not found" });

        const [usage, created] = await UserPromptUsage.findOrCreate({
            where: { userId, promptId },
            defaults: { usedAt: new Date() },
        });

        if (!created) {
            return res.json(prompt);
        }

        await prompt.update({
            usageCount: prompt.usageCount + 1,
            lastUsedAt: new Date(),
        });

        res.json(prompt);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
