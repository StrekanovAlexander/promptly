import { runLLM } from "../services/llmService.js";

export const runPrompt = async (req, res) => {
    try {
        const { promptText, model } = req.body;
        if (!promptText) return res.status(400).json({ error: "promptText is required" });
        const result = await runLLM(promptText, model);
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
