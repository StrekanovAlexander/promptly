export const runLLM = async (prompt, model = "gpt-3.5-turbo") => {
    return `[${model} mock]: "${prompt}"`;
};