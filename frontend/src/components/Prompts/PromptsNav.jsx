import { Link } from "react-router-dom";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import Icon from "@/components/ui/Icon.jsx";

export default function PromptsNav() {
  const { categories, platforms } = useCategories();
  const { filterCategory, filterPlatforms, togglePlatform } = useFilters();
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-64 flex flex-col gap-3 md:sticky md:top-[105px]">
      <h3 className="text-gray-800 font-opensans font-semibold text-lg mb-2">Категории</h3>
      <Link
        to={`/prompts`}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition
          ${filterCategory === "all" 
          ? "bg-blue-100 text-blue-700 font-medium" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
        }
      >
        <Icon icon="Layers" size={4} />Все категории
      </Link>

      {categories.map((el) => (
        <Link
          key={el.id}
          to={`/prompts/${el.slug}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition
            ${filterCategory === el.id 
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
          }
        >
          <Icon icon={el.icon} size={4} />{el.name}
        </Link>
      ))} 
      
      <h3 className="text-gray-800 font-opensans font-semibold text-lg mt-2">Платформы</h3>
      <div className="ml-2">
        {platforms.map((el) => (
          <div>
            <label
              key={el.id}
              className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-500"
            >
              <input
                type="checkbox"
                checked={filterPlatforms.includes(el.id)}
                onChange={() => togglePlatform(el.id)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="flex items-center gap-2 text-gray-700">
                <img src={`/icons/${el.icon}.svg`} alt={el.name} className="h-5 w-5 filter grayscale opacity-50" />
                <span>{el.name}</span>
              </span>
            </label>
          </div>
        ))} 
      </div>
    </div>
  )
}
