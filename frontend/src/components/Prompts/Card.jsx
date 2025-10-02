import { Link } from "react-router-dom";
import { Heart, BarChart3 } from "lucide-react";
import Icon from "../ui/Icon.jsx";

export default function Card({ prompt }) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col p-6 hover:shadow-lg hover:-translate-y-1 transition-transform">
      {/* Заголовок + избранное */}
      <div className="flex justify-between items-start mb-4"> 
        <h2 className="text-lg font-semibold text-gray-900">{prompt.title}</h2>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-red-500 transition">
            <Heart className={`w-5 h-5 ${prompt.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <div className="flex items-center text-gray-500 text-sm">
            <BarChart3 className="w-4 h-4 mr-1" />
            {prompt.usageCount}
          </div>
        </div>
      </div>
      {/* Категория */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
          <Icon icon={prompt.Category.icon} size="5" />
          {prompt.Category.name}
        </span>
      </div>
      {/* Теги */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags?.split(",").map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Тело промпта */}
      <p className="text-gray-700 mb-4 line-clamp-3">{prompt.body}</p>
      {/* Пример ответа */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <p className="text-gray-800 text-sm line-clamp-4">
          {prompt.response || "Нет примера ответа"}
        </p>
      </div>
      {/* Футер */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button className="flex-1 min-w-[100px] bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm transition font-medium text-sm">
            Скопировать
          </button>
          <Link
            to={`/prompts/${prompt.id}`} 
            className="flex-1 min-w-[100px] bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm transition font-medium text-sm text-center"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
 