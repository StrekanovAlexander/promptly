import { runLLM } from "../services/llmService.js";

export const enhancePrompt = async (req, res) => {
    try {
        const { promptText, style = "standard", intensity = "balanced", goal = "general" } = req.body;

        if (!promptText) {
            return res.status(400).json({ error: "promptText is required" });
        }

        const systemInstruction = `
You are a professional prompt engineer.
Your task is to improve the provided prompt to make it clearer, more effective, and more precise.
Follow these parameters:
- Style: ${style}
- Intensity: ${intensity}
- Goal: ${goal}

Guidelines:
- Preserve the original meaning.
- Do not include explanations, comments, or metadata.
- Return only the improved prompt text.
`;

        // Отправляем запрос к LLM (в llmService уже есть runLLM)
        const result = await runLLM(`${systemInstruction}\n\nPrompt:\n${promptText}`);
        res.json({ original: promptText, improved: result, meta: { style, intensity, goal } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
