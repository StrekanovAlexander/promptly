import { useFilters } from "../../../context/PostFiltersContext";

export default function PostToolBar() {
    const { postSearch, setPostSearch, postSorting, setPostSorting } = useFilters();
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <input
                type="text"
                placeholder="Поиск публикаций..."
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
                className="flex-1 w-full md:w-1/2 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={postSorting}
                onChange={(e) => setPostSorting(e.target.value)}
                className="w-full md:w-1/4 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
                <option value="up">По алфавиту (А-Я)</option>
                <option value="down">По алфавиту (Я-А)</option>
            </select>
        </div>
    )
}