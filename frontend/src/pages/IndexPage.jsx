import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { getPrompts } from "@/services/api.js";
import Card from "@/components/Prompts/Card.jsx";
import Spinner from "@/components/ui/Spinner.jsx";

export default function IndexPage() {
  const { filterSearch, setFilterSearch } = useFilters();
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

  let filteredPrompts = prompts;
  
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
          { status.prompts?.isLoading && <Spinner /> }
          { !status.prompts?.isLoading && 
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 peer-focus:text-blue-500" />
              <input
                type="text"
                value={filterSearch}
                placeholder="Например: маркетинг, дизайн, код..."
                onChange={(ev) => setFilterSearch(ev.target.value)}
                className="peer w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm
                placeholder-gray-400 placeholder-opacity-100 focus:placeholder-opacity-0 transition-all duration-200"
              />
            </div> 
          }
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
