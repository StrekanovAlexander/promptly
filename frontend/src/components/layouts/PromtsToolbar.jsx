import { useFilters } from "../../context/FiltersContext.jsx";
import SearchInput from "../forms/SearchInput.jsx";
import SortSelector from "../forms/SortSelector.jsx";

export default function PromptsToolbar() {
    const { setSearch, sortByPopularity, setSortByPopularity } = useFilters();
    
    return (
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
                <SearchInput setSearch={setSearch} />
            </div>
            <div className="w-full md:w-auto">
                <SortSelector
                    sortByPopularity={sortByPopularity}
                    setSortByPopularity={setSortByPopularity}
                />
            </div>
        </div>
    );
}