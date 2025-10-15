import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext.jsx";
import EncanceOptionGroup from "./EnhanceOptionGroup.jsx";
import { enhancePrompt } from "@/services/api.js";

export default function PromptEnhancerForm() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    brevity: "medium",
    tone: "neutral",
    strength: "medium"
  });

  const handleEnhance = async () => {
    if (!user) {
      toast.error("Для отправки запроса Вам необходимо авторизоваться");
      return;
    }
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const data = await enhancePrompt({ 
        promptText: prompt, 
        options
      });
      setResult(data.improved);
    } catch (err) {
      setResult(`Ошибка: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* Верхний ряд: контейнер опций слева + кнопка справа */}
      <div className="flex items-start justify-between gap-4">
        {/* Контейнер опций */}
        <div className="flex gap-4">
          <EncanceOptionGroup
            title="Краткость"
            keyName="brevity"
            values={["short", "medium", "long"]}
            onChange={(update) => setOptions(prev => ({ ...prev, ...update }))}
          />
          <EncanceOptionGroup
            title="Тон"
            keyName="tone"
            values={["neutral", "friendly", "creative"]}
            onChange={(update) => setOptions(prev => ({ ...prev, ...update }))}
          />
          <EncanceOptionGroup
            title="Сила"
            keyName="strength"
            values={["light", "medium", "strong"]}
            onChange={(update) => setOptions(prev => ({ ...prev, ...update }))}
          />
        </div>

        {/* Кнопки справа */}
        <div className="flex flex-col gap-3 items-stretch w-48">
          {/* Кнопка улучшения */}
          <button
            onClick={handleEnhance}
            disabled={loading}
            className="w-full px-4 py-2 rounded-xl border border-cyan-500/30
                      font-semibold text-neutral-100
                      bg-gradient-to-b from-neutral-900/80 to-neutral-950/80
                      hover:from-neutral-800/80 hover:to-neutral-900/80
                      shadow-[0_0_6px_rgba(56,189,248,0.25)]
                      hover:shadow-[0_0_12px_rgba(56,189,248,0.35)]
                      transition-all duration-300 ease-out
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Обработка..." : "Улучшить промпт"}
          </button>

          {/* Кнопка очистки */}
          <button
            onClick={() => {
              setPrompt("");
              setResult("");
            }}
            className="w-full px-4 py-2 rounded-xl border border-neutral-600/40
                      text-neutral-300 font-medium
                      bg-gradient-to-b from-neutral-850/80 to-neutral-900/80
                      hover:from-neutral-800/80 hover:to-neutral-850/80
                      hover:border-cyan-500/30 hover:text-neutral-100
                      shadow-[0_0_4px_rgba(56,189,248,0.15)]
                      hover:shadow-[0_0_10px_rgba(56,189,248,0.25)]
                      transition-all duration-300 ease-out"
          >
            Очистить
          </button>
        </div>

      </div>

      {/* Контейнер двух колонок для промпта и результата */}
      <div className="flex flex-col md:flex-row gap-6 w-full flex-1 h-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Введите промпт..."
          className="
            flex-1 min-h-0 h-full p-4 rounded-xl
            bg-neutral-700/90 text-neutral-100
            border border-cyan-500/30
            focus:outline-none focus:ring-2 focus:ring-cyan-400/40
            text-base resize-none
          "
        />

        <textarea
          value={result}
          readOnly
          placeholder="Результат будет здесь..."
          className="
            flex-1 min-h-0 h-full p-4 rounded-xl
            bg-neutral-700/90 text-neutral-100
            border border-cyan-500/30
            focus:outline-none focus:ring-2 focus:ring-cyan-400/40
            text-base resize-none
          "
        />
      </div>
    </div>
  );
}
