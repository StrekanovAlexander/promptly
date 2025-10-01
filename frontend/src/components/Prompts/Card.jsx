import { Heart } from "lucide-react";
import Icon from "../ui/Icon.jsx";

export default function Card({ prompt }) {
  return (
    <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-6 h-full">
      {/* Основной контент */}
      <div className="flex-1">
        {/* Заголовок и избранное */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{prompt.title}</h2>
          <button className="text-gray-400 hover:text-red-500 transition">
            <Heart className={`w-5 h-5 ${prompt.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        {/* Категория */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Icon icon={prompt.Category.icon} size="4" /> {prompt.Category.name}
          </span>
        </div>
        {/* Теги */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags?.split(",").map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        {/* Текст промпта */}
        <p className="text-gray-700 mb-4 line-clamp-3">{prompt.body}</p>
        {/* Пример результата */}
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 text-left">
          <p className="text-gray-800 text-sm">
            Пример результата промпта: {prompt.response}
          </p>
        </div>
      </div>
      {/* Футер */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-gray-500 text-xs">Использований: {prompt.usageCount}</span>
        <div className="flex gap-2">
          <button 
            className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm"
          >
            Скопировать
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm"
            onClick={() => console.log("Открыть модальное окно")}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}
 