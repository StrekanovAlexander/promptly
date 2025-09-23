import { Search } from "lucide-react";

export default function SearchInput({ setSearch }) {
    return (
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
                type="text"
                placeholder="Например: маркетинг, дизайн, код..."
                onChange={(ev) => setSearch(ev.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}