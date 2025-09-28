import { formatDate } from "../../../utils/formats.js";

export default function ProfilePromptCard({ prompt }) {
    return (
        <div className="prompt-card p-3 border rounded-lg cursor-pointer relative group hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold text-sm truncate">{prompt.title}</h3>
            <div className="flex justify-between">
                {prompt.category && (
                <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {prompt.category}
                </span>
                )}
                <span className="text-xs text-gray-400 mt-1">{formatDate(prompt.createdAt)}</span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-72 p-3 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <p className="text-sm text-gray-700">{prompt.body}</p>
                <p className="text-xs text-gray-500 mt-2">Updated: {formatDate(prompt.updatedAt)}</p>
                <p className="text-xs text-gray-500 mt-1">Status: {prompt.isPublic ? "Public" : "Private"}</p>
            </div>
        </div>
    );
}
