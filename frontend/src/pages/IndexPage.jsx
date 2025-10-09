import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { getPrompts } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO";
import { Spinner2}  from "@/components/ui/index.jsx";
import Card2 from "@/components/Prompts/Card2.jsx";

export default function IndexPage() {
    const { status, setLoading, setError } = useApiStatus();
    const [ search, setSearch ] = useState("");
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const loadPrompts = async () => {
            setLoading("prompts", true);
            setError("prompts", null);
            try {
                const data = await getPrompts();
                setPrompts(data);
            } catch (err) {
                setError("prompts", err.toString());
            } finally {
                setLoading("prompts", false);
            }
        };
        loadPrompts();
    }, []);

    useSEO({
        title: "Promptly - библиотека промптов для ChatGPT и AI",
        description: "Поиск и подборка промптов: программирование, маркетинг, дизайн, обучение.",
        canonical: "https://www.promptly.team"
    });

    let filteredPrompts = prompts.slice(0, 8);

    if (prompts && search.trim()) {
        filteredPrompts = prompts.filter(el =>
            el.title.toLowerCase().includes(search.toLowerCase()) ||
            el.body.toLowerCase().includes(search.toLowerCase()) ||
            el.response.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <>
            <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-opensans font-bold mb-4">
                    Найди свой идеальный промпт
                </h2>
                <p className="text-neutral-400 text-lg">
                    Библиотека лучших промптов для генеративного ИИ
                </p>
            </section>

            <section className="flex justify-center mt-6">
                <div className="relative w-full max-w-xl">
                    
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400 transition-colors duration-300
                            peer-focus:text-sky-300"
                        size={20}
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(ev) => setSearch(ev.target.value)}
                        placeholder="Поиск по промптам..."
                        className="w-full rounded-xl bg-neutral-700/90 pl-10 pr-4 py-3 text-base 
                            border border-sky-600 text-neutral-100 placeholder-neutral-400
                            focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition peer"
                    />
                </div>
            </section>

            <section className="mt-10 flex flex-col items-center">
                
                <h3 className="text-3xl font-semibold font-opensans mb-8 text-center">
                    Недавно добавленные промпты
                </h3>
                
                { status.prompts?.isLoading && <Spinner2 /> }

                {!status.prompts?.isLoading &&
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
                        {filteredPrompts.map((el) => (
                            <Card2 key={el.id} prompt={el} />
                        ))}
                    </div>
                }

            </section>

            <section className="text-center">
                <Link
                    to="/prompts"
                    className="inline-block px-6 py-3 rounded-xl border border-sky-500/40 text-sky-300 font-medium
                        bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                        hover:from-sky-500/20 hover:to-sky-600/10
                        hover:border-sky-400 hover:text-sky-200
                        drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                        hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                        transition-all duration-500 ease-out backdrop-blur-sm"
                >
                    Смотреть все промпты
                </Link>
            </section>
        </>
    )
}