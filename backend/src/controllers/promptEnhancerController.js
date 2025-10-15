import { runLLM } from "../services/llmService.js";

export const enhancePrompt = async (req, res) => {
    try {
        const { promptText, options = {} } = req.body;

        if (!promptText) {
            return res.status(400).json({ error: "promptText is required" });
        }

        const {
            brevity = "medium",
            tone = "neutral",
            strength = "medium"
        } = options;

const systemInstruction = `
Ты — профессиональный инженер по промптам (Prompt Engineer).
Твоя задача — улучшить переданный пользователем промпт так, чтобы AI понимал его максимально точно и выдавал качественный результат.
Следуй этим правилам:

1. Сохраняй исходный смысл.
2. Не переводи текст, оставляй язык пользователя.
3. Добавь конкретные роли, контекст и инструкции для AI.
4. Если возможно, предложи форматирование вывода или ограничения.
5. Не добавляй объяснения, комментарии или метаданные — возвращай только улучшенный промпт.

Параметры улучшения:
- Краткость: ${brevity}
- Тон: ${tone}
- Сила воздействия: ${strength}

Возвращай только текст улучшенного промпта.
`;

        const result = await runLLM(`${systemInstruction}\n\nPrompt:\n${promptText}`);

        res.json({
        original: promptText,
        improved: result,
        meta: { brevity, tone, strength }
        });
    } catch (err) {
        console.error("Enhancer error:", err);
        res.status(500).json({ error: err.message });
    }
};
