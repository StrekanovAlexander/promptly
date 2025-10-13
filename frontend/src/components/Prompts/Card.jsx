import { Link } from "react-router-dom";
import { Calendar, Star } from "lucide-react";
import { Icon2, Difficulty } from "../ui/index.jsx";
import CustomIcon from "../ui/custom-icons/CustomIcon.jsx";

export default function Card({ prompt }) {
  return (
    <Link
      to={`/prompts/${prompt.Category.slug}/${prompt.slug}-${prompt.id}`} 
      className="bg-neutral-800 
        backdrop-blur-md 
        border border-neutral-700 
        p-5 sm:p-6 lg:p-7 
        flex flex-col justify-between 
        rounded-xl 
        shadow-sm 
        hover:border-sky-400/60 
        hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] 
        transition-all duration-300 ease-out 
        cursor-pointer 
        relative overflow-hidden 
        aspect-[3/2] h-full"
    >
      {/* Неоновая верхняя полоса */}
      <div className="absolute top-0 left-0 w-full h-[1px] 
        bg-sky-400/30 
        shadow-[0_0_6px_rgba(56,189,248,0.25)] 
        transition-all duration-300 group-hover:bg-sky-400/50 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.35)]">
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Платформы */}
        <div className="flex items-center gap-2 opacity-80">
          {prompt.platforms?.map(el => (
            <CustomIcon
              key={el.id}
              icon={el.icon}
              size={16}
              className="text-neutral-400 hover:text-sky-400 transition-colors"
              title={el.name}
            />
          ))}
        </div>

        {/* Популярность */}
        <div className="flex items-center gap-1 text-yellow-300 shrink-0">
          <Star size={14} />
          <span className="text-xs text-neutral-300">{prompt.usageCount}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow relative z-10 mb-4">
        <h4 className="text-lg font-semibold font-opensans mb-1 text-neutral-50 line-clamp-2">
          {prompt.title}
        </h4>
        <p className="text-neutral-400 text-sm flex-grow leading-relaxed line-clamp-3 overflow-hidden">
          {prompt.description}
        </p>
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-2 items-center text-xs mb-3">
        {prompt.tags?.split(",").map((tag) => (
          <span
            key={tag}
            className="bg-neutral-700/60 text-neutral-200 rounded-full px-2 py-0.5 hover:bg-neutral-700/80 transition-colors duration-200"
          >
            #{tag.trim()}
          </span>
        ))}
      </div>

      {/* Footer: категория сверху, затем теги и популярность */}
      <div className="flex items-center justify-between border-t border-neutral-700/40 pt-4 mt-4 relative z-10">
  
        {/* Левая часть — категория */}
        <div className="flex items-center gap-2">
          <Icon2 
            icon={prompt.Category.icon} 
            size={16} 
            className="text-sky-300/90 drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]" 
          />
          <span className="bg-sky-400/20 text-sky-300 rounded-full px-2 py-0.5 font-medium text-xs drop-shadow-[0_0_2px_rgba(56,189,248,0.3)]">
            {prompt.Category.name}
          </span>
          <Difficulty difficulty={prompt.difficulty} />
        </div>

        {/* Правая часть — дата */}
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
          <Calendar size={14} className="text-sky-400/80 drop-shadow-[0_0_4px_rgba(56,189,248,0.4)]" />
          <span className="text-neutral-400/90">
            {new Date(prompt.createdAt).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).replace(/\//g, '.')}
          </span>
        </div>
      </div>
    </Link>
  );
}