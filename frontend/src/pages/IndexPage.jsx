import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { getPrompts } from "@/services/api.js";
import SearchInput from "@/components/Prompts/SearchInput.jsx";
import Card from "@/components/Prompts/Card.jsx";
import Spinner from "@/components/ui/Spinner.jsx";

/*
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
*/

export default function IndexPage() {
  const { filterSearch } = useFilters();
  const { status, setLoading, setError } = useApiStatus();
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

  let filteredPrompts=[];
  
  if (prompts && filterSearch.trim()) {
    filteredPrompts = prompts.filter(el =>
      el.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      el.body.toLowerCase().includes(filterSearch.toLowerCase()) ||
      el.response.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }

  return (
    <>
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-opensans font-semibold text-gray-800 mb-10 leading-tight">
            Подбери идеальный промпт для своей задачи
          </h1>
          <SearchInput />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        {status.prompts?.isLoading && <Spinner />}
        {!status.prompts?.isLoading &&
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((el) => (
              <Card key={el.id} prompt={el} />
            ))}
          </div>
        }
      </section>

      {filteredPrompts.length &&  
        <div className="mt-8 flex justify-center">
          <Link
            to="/prompts"
            className="text-[#4F8EF7] hover:text-[#3A6DD1] font-medium transition-colors"
          >
            Смотреть все промпты
          </Link>
        </div>
      }
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

