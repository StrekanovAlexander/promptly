import { Heart, Eye } from "lucide-react";
import { formatDate } from "../../utils/formats";

export default function Card({ prompt }) {
    const tags = prompt.tags.split(',');

    return (
        <div className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition">
            {/* Header */}
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">
                    {prompt.title}
                </h2>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {prompt.category}
                </span>
            </div>
            {/* Body */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-1">
                {prompt.body}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-1">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{ formatDate(prompt.updatedAt) } by {prompt.author || "Unknown"}</span>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {prompt.usageCount}
                    </div>
                    <button className="text-gray-400 hover:text-red-500">
                        <Heart size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}