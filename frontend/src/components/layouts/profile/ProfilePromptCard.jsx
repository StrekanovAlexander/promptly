import { formatDate } from "../../../utils/formats.js";

export default function ProfilePromptCard({ prompt }) {
    return (
        <div className="prompt-card p-2 border rounded cursor-pointer relative group">
            <h3 className="font-semibold text-sm truncate">{prompt.title}</h3>
            <p className="text-xs text-gray-400">{formatDate(prompt.createdAt)}</p>
            {/* Tooltip */}
            <div className="absolute left-0 top-full mt-1 w-64 p-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <p className="text-sm text-gray-700">{prompt.body}</p>
                <p className="text-xs text-gray-500 mt-1">Updated: {formatDate(prompt.updatedAt)}</p>
                <p className="text-xs text-gray-500">Status:</p>
            </div>
        </div>
    );
}
