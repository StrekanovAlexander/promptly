import { Search } from "lucide-react";
import { useFilters } from "@/context/FiltersContext.jsx";

export default function SearchInput() {
    const { setPromptSearch } = useFilters();
    return (
        <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 peer-focus:text-blue-500" />
            <input
                type="text"
                placeholder="Например: маркетинг, дизайн, код..."
                onChange={(ev) => setPromptSearch(ev.target.value)}
                className="peer w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm
                placeholder-gray-400 placeholder-opacity-100 focus:placeholder-opacity-0 transition-all duration-200"
            />
        </div>
    );
}