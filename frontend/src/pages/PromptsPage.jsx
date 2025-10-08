import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { getPrompts } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO";
import PromptCard from "@/components/Prompts/Card.jsx";
import FormCreatePrompt from "@/components/Prompts/FormCreatePrompt";

export default function PromptsPage() {
  const { user } = useAuth();
  const { categories } = useCategories();
  const { categorySlug } = useParams();
  const { setLoading, setError } = useApiStatus();
  const { filterCategory, setFilterCategory, filterSearch, setFilterSearch, filterPlatforms, sorting, setSorting } = useFilters();
  const [ category, setCategory ] = useState(null);
  const [ prompts, setPrompts ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

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

  useEffect(() => {
    loadPrompts();
  }, []); 

  let filteredPrompts = prompts;

  if (filterCategory !== "all") {
    filteredPrompts = prompts.filter(el => el.categoryId === filterCategory);
  } 
  
  if (filterSearch.trim()) {
    filteredPrompts = prompts.filter(el =>
      el.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      el.body.toLowerCase().includes(filterSearch.toLowerCase()) ||
      el.response.toLowerCase().includes(filterSearch.toLowerCase())
    );
  }

  if (filterPlatforms.length > 0) {
    filteredPrompts = filteredPrompts.filter(el =>
      el.platforms.some(p => filterPlatforms.includes(p.id))
    );
  }

  if (sorting === "popular") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => b.usageCount - a.usageCount);
  } else if (sorting === "newest") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sorting === "oldest") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else {
    filteredPrompts.sort((a, b) => a.title.localeCompare(b.title));
  }

  useSEO({
    title: category ? `${category.name} — Промпты` : "Библиотека промптов",
    description: category?.description || "Подборка промптов по разным направлениям",
    canonical: category
      ? `https://www.promptly.team/prompts/${category.slug}`
      : "https://www.promptly.team/prompts"
  });

  return (
    <div className="flex flex-col gap-6">

      {category &&
        <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
          <Link to="/prompts" className="hover:underline">Промпты</Link>
          <span className="mx-2">/</span>
          <span>{category.name}</span>
        </nav>
      } 
      <div className="flex items-center justify-between"> 
        {!category && 
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-4">
              Библиотека промптов
            </h1>
            <p className="text-gray-500 leading-normal">Все промпты каталога</p>
          </div>
          
        }
        {category && 
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-4">
              { category.name }
            </h1>
            <p className="text-gray-500 leading-normal">{ category.description }</p>
          </div>
        }
        {user &&
          <button
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm transition font-medium text-sm"
          >
            Создать промпт
          </button>
        }
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Поиск */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            value={filterSearch}
            onChange={(ev) => setFilterSearch(ev.target.value)}
            type="text"
            placeholder="Например: маркетинг, дизайн, код..."
            className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Сортировка */}
        <select
          value={sorting} 
          onChange={ev => setSorting(ev.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popular">По популярности</option>
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="title">По наименованию</option>
        </select>
      </div>
      {/* Промпты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
      { isModalOpen && 
        <FormCreatePrompt 
          onClose={() => setIsModalOpen(false)} 
          onCreated={loadPrompts}
        />
      }  
    </div>
  );
}
