import { Search } from "lucide-react";

const prompts = [{
  title: "Instagram пост о кофе",
  body: "Создай продающий пост для Instagram про новый кофе в зернах...",
  category: "Маркетинг",
  tags: "Instagram, копирайтинг, кофе",
  author: "Иван Иванов",
  usageCount: 124,
  isFavorite: false,
},
{
  title: "Instagram пост о кофе",
  body: "Создай продающий пост для Instagram про новый кофе в зернах...",
  category: "Маркетинг",
  tags: "Instagram, копирайтинг, кофе",
  author: "Иван Иванов",
  usageCount: 124,
  isFavorite: false,
},
{
  title: "Instagram пост о кофе",
  body: "Создай продающий пост для Instagram про новый кофе в зернах...",
  category: "Маркетинг",
  tags: "Instagram, копирайтинг, кофе",
  author: "Иван Иванов",
  usageCount: 124,
  isFavorite: false,
}];


export default function IndexPage() {
  return (
    <>
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Заголовок */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-opensans font-semibold text-gray-800 mb-10 leading-tight">
          Подбери идеальный промпт для своей задачи
        </h1>
        {/* Поле поиска */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 peer-focus:text-blue-500" />
          <input
            type="text"
            placeholder="Например: маркетинг, дизайн, код..."
            onChange={(ev) => console.log(ev.target.value)}
            className="peer w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm
              placeholder-gray-400 placeholder-opacity-100 focus:placeholder-opacity-0 transition-all duration-200"
          />
        </div>
      </div>
    </section>

    <section>
      <div className="max-w-7xl mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Повторяем карточки */}
    {prompts.map((prompt) => (
      <div key={prompt.id} className="bg-[#FAFAFA] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-6">
        {/* Заголовок и избранное */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{prompt.title}</h2>
          <button className="text-gray-400 hover:text-red-500 transition">
            {prompt.isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Категория и теги */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.category && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {prompt.category}
            </span>
          )}
          {prompt.tags?.split(",").map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Текст промпта */}
        <p className="text-gray-700 mb-4 line-clamp-3">{prompt.body}</p>

        {/* Пример результата */}
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 text-left">
          <p className="text-gray-800 text-sm">
            Пример результата промпта: “Наш новый кофе в зернах обладает насыщенным вкусом и ароматом шоколада и карамели...”
          </p>
        </div>

        {/* Футер карточки */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">Использований: {prompt.usageCount}</span>
          <div className="flex gap-2">
    <button className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm">
      Скопировать
    </button>
    <button
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm"
      onClick={() => console.log("Открыть модальное окно")}
    >
      Подробнее
    </button>
  </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </section>
  </>  


  );
}



/*
import { useState, useEffect } from "react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { getPrompts } from "@/services/api.js";
import Hero from "@/layouts/Hero.jsx";
import PromptCard from "@/components/Prompts/PromptCard.jsx";

export default function IndexPage() {
  const { setLoading, setError } = useApiStatus();
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

  return (
      <>
        <Hero />

        <section className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-baloo font-semibold">What can you do with Promptly?</h2>


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

          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-baloo font-semibold">Popular prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prompts.slice(0, 6).map((el) => (
                <PromptCard key={el.id} prompt={el} />
              ))}
            </div>
          </div>
        </section>
      </>
  )
}
  */

