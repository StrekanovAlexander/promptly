import { ArrowDownWideNarrow } from "lucide-react";

export default function SortSelector({ sortByPopularity, setSortByPopularity }) {
    return (
        <div className="relative group">
            <ArrowDownWideNarrow className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <select
                value={sortByPopularity ? "popularity" : "date"} 
                onChange={ev => setSortByPopularity(ev.target.value === "popularity")}
                className="rounded-lg border border-gray-300 pl-10 pr-5 py-2 text-sm text-gray-700"
            >
                <option value="popularity">Популярность</option>
                <option value="date">Дата</option>
            </select>
        </div>
    );
}