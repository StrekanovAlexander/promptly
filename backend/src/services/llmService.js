import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Запуск промпта на выбранной модели LLM.
 * @param {string} prompt - текст промпта
 * @param {string} model - модель (по умолчанию gpt-3.5-turbo)
 */
export const runLLM = async (prompt, model = "gpt-3.5-turbo") => {
    try {
        // Проверяем, чтобы ключ был подключён
        if (!process.env.OPENAI_API_KEY) {
            console.warn("⚠️ OPENAI_API_KEY не найден. Возвращаем mock.");
            return `[${model} mock]: "${prompt}"`;
        }

        const response = await client.chat.completions.create({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 500,
        });

        // Возвращаем только текст ответа
        return response.choices[0]?.message?.content || "Нет ответа от модели.";
        
    } catch (error) {
        console.error("Ошибка при обращении к OpenAI:", error);
        throw new Error(error.message);
    }
};
