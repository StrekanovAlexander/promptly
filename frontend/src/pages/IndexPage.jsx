import { useState, useEffect } from "react";
import { Lightbulb, Edit3, Users } from "lucide-react";
import { useSEO } from "@/hooks/useSEO.jsx";
import { NeonLink}  from "@/components/ui/index.jsx";
import CustomIcon from "@/components/ui/custom-icons/CustomIcon.jsx";

const examples = [
    "Объясни сложную идею простыми словами, как для ребёнка.",
    "Напиши краткое резюме книги «1984» в трёх предложениях.",
    "Составь 5 идей для стартапа в области ИИ.",
    "Сгенерируй описание персонажа для фэнтези-романа.",
    "Помоги переписать текст письма в более вежливом тоне.",
    "Объясни разницу между машинным обучением и ИИ.",
    "Подскажи, как улучшить читаемость этого кода на Python.",
    "Напиши вдохновляющую цитату о творчестве.",
    "Придумай 3 названия для подкаста о технологиях.",
    "Составь план изучения JavaScript для новичка.",
    "Создай пример промпта для генерации логотипа в Midjourney.",
    "Придумай короткий твит, который заинтересует дизайнеров.",
    "Составь вопросы для интервью с UX-специалистом.",
    "Объясни принцип работы ChatGPT простыми словами.",
    "Предложи идеи, как использовать ИИ в образовании."
];

const icons = ["chatgpt", "bard", "claude", "copilot"];

export default function IndexPage() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [icon, setIcon] = useState(icons[0]);
    const [iconFade, setIconFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setIconFade(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % examples.length);
                // Выбираем случайную иконку
                setIcon(icons[Math.floor(Math.random() * icons.length)]);

                setFade(true);
                setIconFade(true);
            }, 400); // время совпадает с анимацией исчезновения
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useSEO({
        title: "Promptly - библиотека промптов для ChatGPT и AI",
        description: "Поиск и подборка промптов: программирование, маркетинг, дизайн, обучение.",
        canonical: "https://www.promptly.team"
    });

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
                    <NeonLink to="/prompts" pulse>
                        Перейти к библиотеке
                    </NeonLink>
                </div>

                {/* Пример промпта */}
                <div className="mt-24 flex items-center justify-center gap-2 text-neutral-400 text-sm md:text-base font-light">
                    <div
                        className={`transition-all duration-500 ${
                            iconFade
                            ? "opacity-100 rotate-y-0"
                            : "opacity-0 rotate-y-90"
                        }`}
                        style={{ transformOrigin: "center" }}
                    >
                        <CustomIcon
                            icon={icon}
                            size={18}
                            className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
                        />
                    </div>
                    <div
                        className={`transition-opacity duration-500 ${
                            fade ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <span className="text-neutral-400">Пример промпта:</span>
                        <span className="text-neutral-200 italic ml-2">
                            {examples[index]}
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-gradient-to-b from-neutral-900 to-neutral-800 text-center">
                <h2 className="text-3xl md:text-4xl font-opensans font-bold text-neutral-200 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                    Почему важно уметь работать с промптами
                </h2>
                <p className="text-neutral-400 text-lg max-w-3xl mx-auto mb-12">
                    Освоение работы с промптами сегодня — это подготовка к навыкам завтрашнего дня. В ближайшие годы умение формулировать запросы к ИИ станет неотъемлемой частью работы, обучения и творчества. На этой платформе вы можете исследовать готовые идеи, создавать свои промпты и делиться ими, чтобы учиться и развиваться вместе с сообществом.
                </p>

                <div className="w-full max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
                    {/* Карточка 1 */}
                    <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-sm hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex flex-col items-center">
                    <div className="text-neutral-100 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                        <Lightbulb size={40} />
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
                    <div className="text-neutral-100 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                        <Edit3 size={40} />
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
                    <div className="text-neutral-100 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                        <Users size={40} />
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

            <section className="text-center mt-8 mb-8">
                <p className="text-neutral-400 text-lg mb-8">
                    Готов попробовать? Создай свой первый промпт!
                </p>
                <NeonLink to="/prompts" pulse>
                    Перейти к библиотеке
                </NeonLink>
            </section>
        </>
    )
}
