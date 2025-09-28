import { Search } from "lucide-react";
import { useFilters } from "../../../context/FiltersContext.jsx";

export default function PostToolBar() {
    const { postSearch, setPostSearch, postSorting, setPostSorting } = useFilters();

    return (
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        value={postSearch} 
                        type="text"
                        placeholder="Marketing, design, code..."
                        onChange={(ev) => setPostSearch(ev.target.value)}
                        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="w-full md:w-auto">
                <select
                    value={postSorting} 
                    onChange={ev => setPostSorting(ev.target.value)}
                    className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-gray-700"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="up">Alphabetic up</option>
                    <option value="down">Alphabetic down</option>
                </select>
            </div>
        </div>
    )
}
