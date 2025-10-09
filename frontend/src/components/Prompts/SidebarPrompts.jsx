import { Link, useLocation } from "react-router-dom";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { Icon2 } from "@/components/ui/index.jsx";
import CustomIcon from "../ui/custom-icons/CustomIcon.jsx";

export default function SidebarPrompts() {
    const location = useLocation();
    const { categories, platforms } = useCategories();
    const { filterCategory, filterPlatforms, togglePlatform } = useFilters();
    
    const allCategories = [{id: 0, name: "Все категории", icon: "Layers", slug: ""}, ...categories];
    const isActive = (id) => filterPlatforms.includes(id);

    return (
        <nav className="flex flex-col gap-6">
            {/* Заголовок блока */}
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider px-2">
                Категории
            </h3>

            <ul className="flex flex-col gap-1">
                {allCategories.map((el) => {
                    let isActive = false;
                    if (el.id === 0 && filterCategory === "all") {
                        isActive = true;
                    } else {
                        isActive = location.pathname === `/prompts/${el.slug}`;
                    }
                    return (
                        <li key={el.id}>
                            <Link
                                to={`/prompts/${el.slug}`}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                                ${isActive 
                                    ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" 
                                    : "text-neutral-300 hover:bg-neutral-800/60 hover:text-sky-300"
                                }`}
                            >
                                <Icon2 icon={el.icon} size={18} className={isActive ? "text-sky-400" : "text-neutral-400"} />
                                <span className="text-sm font-medium">{el.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            
            {/* Заголовок блока */}
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider px-2">
                Платформы
            </h3>
            <ul className="flex flex-col gap-1">
                {platforms.map((el) => 
                    <li key={el.id}>
                        <button
                            onClick={() => togglePlatform(el.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                                isActive(el.id)
                                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                                : "text-neutral-300 hover:bg-neutral-800/60 hover:text-sky-300"
                            }`}
                        >
                            <CustomIcon 
                                icon={el.icon} 
                                size={18} 
                                className={isActive(el.id) ? "text-sky-400" : "text-neutral-400"} title={el.name} 
                            />
                            <span className="text-sm font-medium">{el.name}</span>
                        </button>
                    </li>
                )}        
            </ul>    
        </nav>
    ) 
}