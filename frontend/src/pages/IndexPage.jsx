import Hero from "@/layouts/Hero.jsx";
import PromptCard from "@/components/Prompts/PromptCard.jsx";
// import GuideCard from "@/components/Guides/GuideCard.jsx";

const prompts = [
  {
    id: 1,
    title: "Генератор идей стартапов",
    body: "Предложи 5 идей для технологического стартапа с кратким бизнес-планом.",
    author: "Alex",
    tags: ["стартап", "идеи", "бизнес"],
    category: "Business",
    usageCount: 124
  },
  {
    id: 2,
    title: "Напиши пост для соцсетей",
    body: "Создай engaging пост для Instagram о новом продукте компании.",
    author: "Maria",
    tags: ["контент", "маркетинг", "соцсети"],
    category: "Marketing",
    usageCount: 98
  },
  {
    id: 3,
    title: "Сценарий для видео",
    body: "Составь сценарий короткого видео для продвижения онлайн-курса.",
    author: "Ivan",
    tags: ["контент", "видео", "гайды"],
    category: "Education",
    usageCount: 56
  },
  {
    id: 4,
    title: "Генератор кода на Python",
    body: "Напиши функцию на Python, которая сортирует список словарей по ключу 'score'.",
    author: "Olga",
    tags: ["код", "python", "программирование"],
    category: "Programming",
    usageCount: 142
  },
  {
    id: 5,
    title: "Промпт для дизайнера",
    body: "Предложи цветовую палитру для лендинга приложения о здоровье.",
    author: "Nikita",
    tags: ["дизайн", "цвет", "UX"],
    category: "Design",
    usageCount: 77
  },
  {
    id: 6,
    title: "Генератор креативных слоганов",
    body: "Создай 10 коротких слоганов для бренда одежды.",
    author: "Sofia",
    tags: ["креатив", "маркетинг", "брендинг"],
    category: "Creative",
    usageCount: 65
  },
  {
    id: 7,
    title: "План организации событий",
    body: "Составь план на неделю для проведения онлайн-вебинаров.",
    author: "Pavel",
    tags: ["организация", "вебинар", "план"],
    category: "Organization",
    usageCount: 38
  },
  {
    id: 8,
    title: "FAQ для сайта",
    body: "Составь список из 10 часто задаваемых вопросов и ответов для сайта компании.",
    author: "Alex",
    tags: ["контент", "информация", "FAQ"],
    category: "Info",
    usageCount: 84
  },
  {
    id: 9,
    title: "Креативные идеи для блога",
    body: "Придумай 5 идей для постов в блоге о технологиях ИИ.",
    author: "Maria",
    tags: ["креатив", "блог", "ИИ"],
    category: "Creative",
    usageCount: 91
  },
  {
    id: 10,
    title: "Образовательные упражнения",
    body: "Создай 3 задания для студентов по теме 'машинное обучение'.",
    author: "Ivan",
    tags: ["образование", "учеба", "ИИ"],
    category: "Education",
    usageCount: 47
  }
];

export default function IndexPage() {
  return (
      <>
        <Hero />

        <section className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          {/* Left column */}
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-baloo font-semibold">What can you do with Promptly?</h2>

            {/* Block 1 */}
<div className="p-4">
  <h3 className="text-2xl font-baloo font-semibold mb-3 flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-[#C66E58]"></span>
    Ready-to-use templates
  </h3>
  <p className="text-md text-gray-700 leading-relaxed">
    Start faster, no guesswork. Use pre-built prompts for various tasks and save time in your workflow. 
    Explore multiple scenarios for text, images, code, marketing, and learning. Customize each template 
    to fit your projects and consistently achieve high-quality results. This helps streamline your process 
    and inspires new ideas without starting from scratch every time.
  </p>
</div>

{/* Block 2 */}
<div className="p-4">
  <h3 className="text-2xl font-baloo font-semibold mb-3 flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-[#C66E58]"></span>
    Smart filters
  </h3>
  <p className="text-md text-gray-700 leading-relaxed">
    Find exactly what you need. Filter prompts by category, usage, or popularity with ease. 
    Quickly narrow down results using multiple criteria and tags. Save your favorite searches 
    and access relevant prompts whenever you need them. This ensures you spend less time searching 
    and more time creating.
  </p>
</div>

{/* Block 3 */}
<div className="p-4">
  <h3 className="text-2xl font-baloo font-semibold mb-3 flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-[#C66E58]"></span>
    Learn & improve
  </h3>
  <p className="text-md text-gray-700 leading-relaxed">
    Guides and best practices. Discover tips and strategies to create more effective prompts for AI. 
    Step-by-step tutorials and curated examples help you understand how to achieve better results, 
    experiment confidently, and continuously improve your prompt-writing skills.
  </p>
</div>

{/* Block 4 */}
<div className="p-4">
  <h3 className="text-2xl font-baloo font-semibold mb-3 flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-[#C66E58]"></span>
    Community sharing
  </h3>
  <p className="text-md text-gray-700 leading-relaxed">
    Contribute and inspire others. Share your prompts and explore creations from the community. 
    Engage with like-minded users, learn from others’ approaches, and build a collaborative environment 
    that encourages creativity, experimentation, and collective growth.
  </p>
</div>


            
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-baloo font-semibold">Popular prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prompts.slice(0, 6).map((el) => (
                <PromptCard key={el.id} prompt={el} />
              ))}
            </div>
          </div>
        </section>

    
        {/* <section className="py-16 border-b">
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
        </section> */}
      </>
  )
}