import { useState } from "react";
import { Link } from "react-router-dom";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { runPrompt } from "../services/api.js";

export default function RunPromptPage() {
    const { status, setLoading, setError } = useApiStatus();
    const [promptText, setPromptText] = useState("");
    const [result, setResult] = useState("");

    const run = async () => {
        if (!promptText.trim()) return;
        setLoading("run_prompt", true);
        setError("run_prompt", null);
        setResult("");

        try {
            const data = await runPrompt(promptText);
            setResult(data.result);
        } catch (err) {
            setError("run_prompt", err.toString());
        } finally {
            setLoading("run_prompt", false);
        }
    };

    return (
        <div className="w-full">
            
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
                <Link to="/" className="hover:text-sky-400 transition-colors duration-200">Главная</Link>
                <span className="text-neutral-600">/</span>
                <span 
                    className="text-neutral-300 font-medium relative"
                    style={{
                        textShadow: '0 0 4px rgba(56,189,248,0.5), 0 0 10px rgba(56,189,248,0.3)'
                    }}
                >
                    Запуск промпта
                </span>
            </nav>

            <section className="mt-6 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold font-opensans text-neutral-300">
                    Запуск промпта
                </h1>
            </section> 

            <textarea
                className="w-full min-h-[120px] 
                bg-neutral-900/70 
                text-neutral-100 
                placeholder-neutral-500 
                border border-sky-500/40 
                rounded-xl 
                p-4 
                focus:outline-none 
                focus:ring-2 focus:ring-sky-400 
                shadow-[0_0_10px_rgba(56,189,248,0.25)] 
                hover:shadow-[0_0_14px_rgba(56,189,248,0.35)] 
                transition-all duration-300 
                backdrop-blur-sm
                resize-none"
                rows={5}
                placeholder="Введите текст промпта..."
                value={promptText}
                onChange={(ev) => setPromptText(ev.target.value)}
            />

            <div className="my-6 flex gap-4">        
                <button
                    className="
                        inline-block px-6 py-3 rounded-xl border border-sky-500/40 
                        text-neutral-100 font-medium
                        bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                        hover:from-sky-500/20 hover:to-sky-600/10
                        hover:border-sky-400 hover:text-neutral-50
                        drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                        hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                        transition-all duration-500 ease-out backdrop-blur-sm"
                    onClick={run}
                    disabled={status.run_prompt?.isLoading}
                >
                    {status.run_prompt?.isLoading ? "Обработка..." : "Получить ответ"}
                </button>
                
                <button
                    className="
                        inline-block px-6 py-3 rounded-xl border border-sky-500/40 
                        text-neutral-100 font-medium
                        bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                        hover:from-sky-500/20 hover:to-sky-600/10
                        hover:border-sky-400 hover:text-neutral-50
                        drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                        hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                        transition-all duration-500 ease-out backdrop-blur-sm"
                    onClick={() => {
                        setPromptText("");
                        setResult("");
                    }}
                >
                    Очистить
                </button>
            
            </div>

            {status.run_prompt?.error && <div className="text-red-500 mb-2">{status.run_prompt?.error}</div>}

            <div
                className="w-full md:flex-1 
                    bg-neutral-900/70 
                    backdrop-blur-md 
                    rounded-xl 
                    p-6 
                    border border-sky-500/30 
                    text-neutral-100 
                    shadow-[0_0_12px_rgba(56,189,248,0.15)] 
                    hover:shadow-[0_0_16px_rgba(56,189,248,0.25)] 
                    transition-all duration-300 
                    select-none 
                    min-h-[240px] 
                    whitespace-pre-wrap"
            >
                {result || "Результат появится здесь..."}
            </div>
        </div>
    );
}