import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import Icon from "@/components/ui/Icon.jsx";

export default function CategoryNav() {
  const { categories, setCategories } = useCategories();
  const { filterCategory, setFilterCategory } = useFilters();
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-64 flex flex-col gap-3">
      <h3 className="text-gray-800 font-opensans font-semibold text-lg mb-2">Категории</h3>
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition
          ${filterCategory === "all" 
          ? "bg-blue-100 text-blue-700 font-medium" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
        }
        onClick={() => setFilterCategory("all")}
      >
        <Icon icon="Layers" size={4} />Все категории
      </button>

      {categories.map((el) => (
        <button
          key={el.id}
          onClick={() => setFilterCategory(el.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition
            ${filterCategory === el.id 
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
          }
        >
          <Icon icon={el.icon} size={4} />{el.name}
        </button>
      ))}
    </div>
  )
}
