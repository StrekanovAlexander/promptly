import { useState, useEffect } from "react";

const categorySlides = [
    {
        name: "Маркетинг",
        description: "Генерируй рекламные тексты, слоганы, контент для соцсетей и email-рассылки. Поможет создать вирусные и креативные материалы.",
        img: "/assets/marketing.png",
    },
    {
        name: "Дизайн",
        description: "Идеи для графики, презентаций, интерфейсов и брендового контента. Поможет визуализировать концепции и создавать прототипы.",
        img: "/assets/design.jpg",
    },
    {
        name: "Программирование",
        description: "Автоматизируй код, получай шаблоны функций, решения задач или целые фрагменты программ. Идеально для разработчиков любого уровня.",
        img: "/assets/programming.jpg",
    },
    {
        name: "Образование",
        description: "Учебные материалы, тесты, шпаргалки и объяснения сложных тем. Для преподавателей, студентов и самообучающихся.",
        img: "/assets/education.jfif",
    },
    {
        name: "Текст",
        img: "/assets/writing.webp",
        description: "Создавай статьи, посты, письма и любые тексты для работы, обучения и развлечений. Используй готовые промпты или генерируй свои."
    },
    {
        name: "Бизнес",
        img: "assets/business.jpg",
        description: "Планы, стратегии, отчёты, email-сообщения и деловые тексты. Для стартапов, менеджеров и специалистов по развитию."
    }
];

export default function CategorySlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % categorySlides.length);
    }, 5000); // смена каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

    return (
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            {categorySlides.map((slide, i) => (
                <div
                    key={slide.name}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                        <h3 className="text-2xl font-bold mb-2">{slide.name}</h3>
                        <p className="text-base leading-relaxed max-w-xl">
                            {slide.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
