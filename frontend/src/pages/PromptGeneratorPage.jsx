import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Lightbulb, Info } from "lucide-react";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import GeneratorForm from "@/components/PromptGenerator/GeneratorForm.jsx";

export default function PromptGeneratorPage() {
    const { categorySlug } = useParams();
    const { setFilterCategory } = useFilters();
    const { categories } = useCategories();
    const [ category, setCategory ] = useState(null);

    useEffect(() => {
        if (categorySlug) {
            const foundCategory = categories.find((el) => el.slug === categorySlug);
            setCategory(foundCategory);
            if (foundCategory) {
                setFilterCategory(foundCategory.id);
            } else {
                setFilterCategory("all");
            }
        } else {
            setCategory(null);
            setFilterCategory("all");
        }
    }, [categorySlug, setFilterCategory]);

    return (
        <div className="w-full">
            {/* Хлебные крошки */}
            <nav
                aria-label="breadcrumb"
                className="flex items-center gap-2 text-sm text-neutral-400 mb-6"
            >
                <Link
                to="/"
                className="hover:text-sky-400 transition-colors duration-200"
                >
                Главная
                </Link>
                <span className="text-neutral-600">/</span>
                <Link
                to="/prompt-generator"
                className="hover:text-sky-400 transition-colors duration-200"
                >
                Генератор
                </Link>
                {category && (
                <>
                    <span className="text-neutral-600">/</span>
                    <span
                    className="text-neutral-300 font-medium relative"
                    style={{
                        textShadow:
                        "0 0 4px rgba(56,189,248,0.5), 0 0 10px rgba(56,189,248,0.3)",
                    }}
                    >
                    {category.name}
                    </span>
                </>
                )}
            </nav>

            {/* Заголовок */}
            <section className="mt-6 mb-8">
                <div className="flex items-center gap-4 mb-4 justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold font-opensans text-neutral-300">
                    {category
                        ? `Генератор промптов: «${category.name}»`
                        : "Генератор промптов"}
                    </h1>
                </div>
                </div>

                {/* Подзаголовок / описание */}
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                    {category
                        ? category.description || ""
                        : ""
                    }
                </p>
            </section>

            {/* Основной контент */}
            <section className="mt-10">
                {!category ? (
                    <div className="mx-auto max-w-3xl bg-neutral-900/60 border border-neutral-700 
                            rounded-2xl p-10 backdrop-blur-sm shadow-[0_0_25px_rgba(56,189,248,0.15)]">
                        <div className="flex items-center gap-3 mb-6">
                            <Info size={24} className="text-sky-400 shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
                            <h2 className="text-2xl font-semibold text-neutral-100">
                                Как это работает?
                            </h2>
                        </div>

                        <ul className="list-disc list-inside text-neutral-300 text-base leading-relaxed space-y-3">
                            <li>
                                Выберите категорию в меню слева — например, <span className="text-sky-400">Контент</span> или <span className="text-sky-400">Маркетинг</span>.
                            </li>
                            <li>
                                Настройте параметры: формат, цель, тональность, аудиторию и другие детали.
                            </li>
                            <li>
                                Нажмите <span className="text-sky-400">«Сгенерировать»</span> — и получите промпт, адаптированный под ваши задачи.
                            </li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3 text-neutral-400 text-base">
                            <Lightbulb size={22} className="text-sky-400 shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
                            <p>
                                Чем точнее вы укажете параметры, тем качественнее будет результат.
                            </p>
                        </div>
                    </div>
                ) : (
                    <GeneratorForm category={category} />
                    // <div className="bg-neutral-900/60 border border-neutral-700 
                    //         rounded-2xl p-10 backdrop-blur-sm shadow-[0_0_25px_rgba(56,189,248,0.15)]">
                    //     <p className="text-neutral-300 mb-4">
                    //     Здесь будет форма генерации промпта для категории{" "}
                    //     <strong>{category.name}</strong>.
                    //     </p>
                    // </div>
                )}
            </section>
        </div>
    )
}