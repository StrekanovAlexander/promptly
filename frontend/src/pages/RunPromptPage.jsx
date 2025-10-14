import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { usePlatformVersions } from "@/context/PlatformVersionsContext.jsx";
import { useSEO } from "@/hooks/useSEO.jsx";
import { runPrompt } from "../services/api.js";
import CustomIcon from "@/components/ui/custom-icons/CustomIcon.jsx";

export default function RunPromptPage() {
    const { user } = useAuth();
    const { platforms } = useCategories();
    const { platformVersion } = usePlatformVersions();
    const { status, setLoading, setError } = useApiStatus();
    const [promptText, setPromptText] = useState("");
    const [result, setResult] = useState("");
    const [platform, setPlatform] = useState({});

    useEffect(() => {
        if (platforms.length > 0 && platformVersion) {
            const filteredPlatform = platforms.find(el => el.icon === platformVersion.platform);
            if (filteredPlatform) {
                setPlatform(filteredPlatform);
            }
        }
    }, [platforms, platformVersion]);

    useSEO({
        title: platform && platformVersion
            ? `Запуск промпта с ${platform.name} версии ${platformVersion.name}`
            : "Запуск промптов с ChatGPT, Claude, Bard, Copilot и другими ИИ",
        description: platform && platformVersion
            ? `Используйте ${platform.name} версии ${platformVersion.name} для отправки запросов к ИИ. Введите промпт, получите результат прямо здесь.`
            : "Отправляйте запросы к ChatGPT, Claude, Bard, Copilot и другим моделям ИИ. Выберите платформу и версию для получения результата.",
        canonical: "https://ваш-сайт.ru/run-prompt"
    });

    const run = async () => {
        if (!user) {
            toast.error("Для отправки запроса Вам необходимо авторизоваться");
            return;
        }    

        if (!platformVersion.isAvailable) {
            toast.error("Функционал временно недоступен. Используйте другие версии платформ.");
            return;
        }

        if (!promptText.trim()) {
            toast.error("Тело промпта пустое. Действие отменено.");
            return;
        }    
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

            <section className="mt-6 mb-8 flex items-start justify-between">
                {/* Заголовок */}
                <h1 className="text-2xl md:text-3xl font-bold font-opensans text-neutral-300">
                    {platform ? `Работа с ${platform?.name} - ${platformVersion?.name}` : "Выберите платформу"}
                </h1>

                {/* Информационный баллон */}
                {platformVersion && (
                    <div className="bg-neutral-800/70 backdrop-blur-md rounded-2xl px-4 py-2 border border-neutral-700/50 max-w-xs flex items-center gap-3">
                {/* Иконка слева, по центру вертикали */}
                <CustomIcon
                    icon={platform?.icon}
                    size={18}
                    className="text-neutral-400 flex-shrink-0"
                    title={platform?.name}
                />

                {/* Информация справа */}
                <div className="flex flex-col">
                    <p className="text-sm text-neutral-200 leading-relaxed">
                    {platformVersion.description}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                    Версия: {platformVersion.version}
                    </p>
                </div>
                </div>
                )}
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

            <div className="my-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
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
                    onClick={run}
                    disabled={!user || status.run_prompt?.isLoading}
                    >
                    {status.run_prompt?.isLoading ? "Обработка..." : "Отправить запрос"}
                    </button>

                    {user && (
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
                        "
                        onClick={() => {
                            setPromptText("");
                            setResult("");
                        }}
                        >
                        Очистить
                        </button>
                    )}
                    
                    {!user && (
                        <div className="text-sm text-neutral-300 py-2 max-w-md">
                            Для отправки запросов необходима <a href="/login" className="text-sky-400 hover:underline">авторизация</a>.
                        </div>
                    )}
                </div>
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