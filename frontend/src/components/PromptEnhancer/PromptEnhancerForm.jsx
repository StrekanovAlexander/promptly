import { useState } from "react";
import { enhancePrompt } from "@/services/api.js";

export default function PromptEnhancerForm() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEnhance = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const data = await enhancePrompt({ promptText: prompt });
            setResult(data.improved);
        } catch (err) {
            setResult(`Ошибка: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-white">
                    Улучшить промпт
                </h2>
            </div>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Введите промпт..."
                className="
                    w-full h-32 p-3 rounded-lg
                    bg-neutral-800 text-neutral-100
                    border border-cyan-500/40
                    focus:outline-none focus:ring-2 focus:ring-cyan-400
                    text-sm resize-none
                "
            />

            <button
                className="
                    inline-block px-6 py-3 rounded-xl border border-sky-500/40 
                    text-neutral-100 font-medium
                    bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                    hover:from-sky-500/20 hover:to-sky-600/10
                    hover:border-sky-400 hover:text-neutral-50
                    drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                    hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                    transition-all duration-500 ease-out backdrop-blur-sm
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
                onClick={() => console.log('Ok!')}
            >
                {loading ? "Обработка..." : "Далее"}
            </button>

            {result && (
                <div className="mt-4 p-4 bg-neutral-800/70 rounded-lg text-neutral-200 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] whitespace-pre-line">
                    {result}
                </div>
            )}
        </div>
    );
}
