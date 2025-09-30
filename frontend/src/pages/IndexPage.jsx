import Hero from "@/layouts/Hero.jsx";
import PromptCard from "@/components/Prompts/PromptCard.jsx";
import GuideCard from "@/components/Guides/GuideCard.jsx";

const prompts = [
  {
    id: 1,
    title: "Генератор идей стартапов",
    body: "Предложи 5 идей для технологического стартапа с кратким бизнес-планом.",
    author: "Alex",
    tags: ["стартап", "идеи", "бизнес"],
    category: "Бизнес",
    usageCount: 124
  },
  {
    id: 2,
    title: "Напиши пост для соцсетей",
    body: "Создай engaging пост для Instagram о новом продукте компании.",
    author: "Maria",
    tags: ["контент", "маркетинг", "соцсети"],
    category: "Маркетинг",
    usageCount: 98
  },
  {
    id: 3,
    title: "Сценарий для видео",
    body: "Составь сценарий короткого видео для продвижения онлайн-курса.",
    author: "Ivan",
    tags: ["контент", "видео", "гайды"],
    category: "Образование",
    usageCount: 56
  },
  {
    id: 4,
    title: "Генератор кода на Python",
    body: "Напиши функцию на Python, которая сортирует список словарей по ключу 'score'.",
    author: "Olga",
    tags: ["код", "python", "программирование"],
    category: "Программирование",
    usageCount: 142
  },
  {
    id: 5,
    title: "Промпт для дизайнера",
    body: "Предложи цветовую палитру для лендинга приложения о здоровье.",
    author: "Nikita",
    tags: ["дизайн", "цвет", "UX"],
    category: "Дизайн",
    usageCount: 77
  },
  {
    id: 6,
    title: "Генератор креативных слоганов",
    body: "Создай 10 коротких слоганов для бренда одежды.",
    author: "Sofia",
    tags: ["креатив", "маркетинг", "брендинг"],
    category: "Креатив",
    usageCount: 65
  },
  {
    id: 7,
    title: "План организации событий",
    body: "Составь план на неделю для проведения онлайн-вебинаров.",
    author: "Pavel",
    tags: ["организация", "вебинар", "план"],
    category: "Организация",
    usageCount: 38
  },
  {
    id: 8,
    title: "FAQ для сайта",
    body: "Составь список из 10 часто задаваемых вопросов и ответов для сайта компании.",
    author: "Alex",
    tags: ["контент", "информация", "FAQ"],
    category: "Информационные",
    usageCount: 84
  },
  {
    id: 9,
    title: "Креативные идеи для блога",
    body: "Придумай 5 идей для постов в блоге о технологиях ИИ.",
    author: "Maria",
    tags: ["креатив", "блог", "ИИ"],
    category: "Креатив",
    usageCount: 91
  },
  {
    id: 10,
    title: "Образовательные упражнения",
    body: "Создай 3 задания для студентов по теме 'машинное обучение'.",
    author: "Ivan",
    tags: ["образование", "учеба", "ИИ"],
    category: "Образование",
    usageCount: 47
  }
];

export default function IndexPage() {
  return (
      <>
        <Hero />
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Популярные промпты</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {prompts.slice(0,4).map((el) => (
              <PromptCard key={el.id} prompt={el} />
            ))}
          </div>
        </section>
    
        <section className="py-16 border-b">
          <h2 className="text-2xl font-bold mb-6 text-center">Гайды и обучение</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <GuideCard
              title="Как писать эффективные промпты для ChatGPT"
              description="Пошаговое руководство, которое поможет вам создавать промпты, получающие лучшие результаты."
              author="Alex"
              date="29.09.2025"
            />
            <GuideCard
              title="Промпты для генерации кода: примеры и советы"
              description="Используйте эти шаблоны для быстрого написания кода с помощью ИИ."
              author="Maria"
              date="28.09.2025"
            />
            <GuideCard
              title="Маркетинговые промпты: как создавать вирусный контент"
              description="Учимся писать промпты для генерации креативного контента, который вовлекает аудиторию."
              author="Ivan"
              date="27.09.2025"
            />
          </div>
        </section>
      </>
  )
}