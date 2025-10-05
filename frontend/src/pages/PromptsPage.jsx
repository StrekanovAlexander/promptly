import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { getPrompts } from "@/services/api.js";
import PromptCard from "@/components/Prompts/Card.jsx";

export default function PromptsPage() {
  const { categories } = useCategories();
  const { categorySlug } = useParams();
  const { setLoading, setError } = useApiStatus();
  const { filterCategory, setFilterCategory, filterSearch, setFilterSearch, sorting, setSorting } = useFilters();
  const [category, setCategory] = useState(null);
  const [ prompts, setPrompts ] = useState([]);
  
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

  if (sorting === "popular") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => b.usageCount - a.usageCount);
  } else if (sorting === "newest") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sorting === "oldest") {
    filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else {
    filteredPrompts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="flex flex-col gap-6">

      {category &&
        <>
          <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
            <Link to="/prompts" className="hover:underline">Промпты</Link>
            <span className="mx-2">/</span>
            <span>{category.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-6">
            { category.name }
          </h1>
        </>  
      }  
      {!category && 
        <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-6">
          Библиотека промптов
        </h1>
      }
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Поиск */}
        <input
          value={filterSearch}
          onChange={(ev) => setFilterSearch(ev.target.value)}
          type="text"
          placeholder="Например: маркетинг, дизайн, код..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
    </div>
  );
}
