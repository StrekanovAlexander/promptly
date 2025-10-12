import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Lightbulb, Edit3, Users } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { getPrompts } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO";
import { Spinner2}  from "@/components/ui/index.jsx";
import Card from "@/components/Prompts/Card.jsx";

export default function IndexPage() {
    // const { status, setLoading, setError } = useApiStatus();
    // const [ search, setSearch ] = useState("");
    // const [prompts, setPrompts] = useState([]);

    // useEffect(() => {
    //     const loadPrompts = async () => {
    //         setLoading("prompts", true);
    //         setError("prompts", null);
    //         try {
    //             const data = await getPrompts();
    //             setPrompts(data);
    //         } catch (err) {
    //             setError("prompts", err.toString());
    //         } finally {
    //             setLoading("prompts", false);
    //         }
    //     };
    //     loadPrompts();
    // }, []);

    useSEO({
        title: "Promptly - библиотека промптов для ChatGPT и AI",
        description: "Поиск и подборка промптов: программирование, маркетинг, дизайн, обучение.",
        canonical: "https://www.promptly.team"
    });

//     let filteredPrompts = prompts.slice(0, 8);
// 
//     if (prompts && search.trim()) {
//         filteredPrompts = prompts.filter(el =>
//             el.title.toLowerCase().includes(search.toLowerCase()) ||
//             el.body.toLowerCase().includes(search.toLowerCase()) ||
//             el.response.toLowerCase().includes(search.toLowerCase())
//         );
//     }

    return (
        <>
            <section className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-neutral-900 to-neutral-800 overflow-hidden px-6 text-center">
                {/* Мягкое свечение позади текста */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.10),transparent_60%)] blur-3xl" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1
                    className="text-4xl md:text-6xl font-opensans font-bold text-neutral-200 mb-4
                                animate-pulseNeon transition-colors duration-700 ease-out"
                    >
                        Открытая библиотека промптов
                    </h1>

                    <p
                    className="text-neutral-400 text-lg leading-relaxed mb-10
                                drop-shadow-[0_0_10px_rgba(56,189,248,0.15)]"
                    >
                        Вдохновляйся идеями, создавай собственные промпты и делись ими с сообществом.
                    </p>

                    {/* Кнопка CTA */}
                    <a
                    href="/prompts"
                    className="inline-block px-8 py-3 rounded-xl 
                                bg-neutral-800/60 border border-sky-400/40 
                                text-neutral-100 font-medium
                                animate-pulseGlow
                                hover:bg-neutral-800/80 hover:border-sky-300 hover:text-white
                                backdrop-blur-sm
                                transition-all duration-300 ease-out"
                    >
                    Смотреть все промпты
                    </a>
                </div>
            </section>

            <section className="py-20 px-6 bg-gradient-to-b from-neutral-900 to-neutral-800 text-center">
                <h2 className="text-3xl md:text-4xl font-opensans font-bold text-neutral-200 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                    Почему важно уметь работать с промптами
                </h2>
                <p className="text-neutral-400 text-lg max-w-3xl mx-auto mb-12">
                    Освоение работы с промптами сегодня — это подготовка к навыкам завтрашнего дня. В ближайшие годы умение формулировать запросы к ИИ станет неотъемлемой частью работы, обучения и творчества. На этой платформе вы можете исследовать готовые идеи, создавать свои промпты и делиться ими, чтобы учиться и развиваться вместе с сообществом.
                </p>

                <div className="w-full max-w-[1800px] mx-auto px-8 grid gap-8 md:grid-cols-3">
                    {/* Карточка 1 */}
                    <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-sm hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex flex-col items-center">
                        <div className="text-sky-400 mb-4">
                            <Lightbulb size={48} />
                        </div>

                        <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                            Вдохновляйся идеями
                        </h3>

                        <p className="text-neutral-400 text-sm text-center">
                            Исследуй готовые промпты, находи новые подходы и получай идеи для своих собственных промптов.
                        </p>

                    </div>

                    {/* Карточка 2 */}
                    <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-sm hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex flex-col items-center">

                        <div className="text-sky-400 mb-4">
                            <Edit3 size={48} />
                        </div>

                        <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                            Создавай собственные промпты
                        </h3>

                        <p className="text-neutral-400 text-sm text-center">
                            Используй готовые идеи как основу, добавляй свои уникальные мысли и создавай промпты под свои задачи.
                        </p>

                    </div>

                    {/* Карточка 3 */}
                    <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-sm hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex flex-col items-center">

                        <div className="text-sky-400 mb-4">
                            <Users size={48} />
                        </div>

                        <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                            Делись промптами
                        </h3>

                        <p className="text-neutral-400 text-sm text-center">
                            Загружай свои промпты, помогай другим находить вдохновение и участвуй в жизни активного сообщества.
                        </p>

                        </div>
                    </div>
            </section>

            {/* <section className="flex justify-center mt-6">
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
            </section> */}

            {/* <section className="mt-10 flex flex-col items-center">
                
                { status.prompts?.isLoading && <Spinner2 /> }

                {!status.prompts?.isLoading &&
                    <>
                        <h3 className="text-3xl font-bold font-opensans mb-8 text-center">
                            Недавно добавленные
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
                            {filteredPrompts.map((el) => (
                                <Card key={el.id} prompt={el} />
                            ))}
                        </div>
                    </>
                }

            </section> */}

            <section className="text-center mb-8">
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