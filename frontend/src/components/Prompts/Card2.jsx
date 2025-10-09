import { Star } from "lucide-react";
import { Icon2 } from "../ui/index.jsx";
import CustomIcon from "../ui/custom-icons/CustomIcon.jsx";

export default function Card2({ prompt }) {
  return (
    <div 
        className="bg-neutral-800 
          backdrop-blur-md 
          border border-neutral-700 
          p-6 
          flex flex-col justify-between 
          rounded-t-2xl rounded-b-xl 
          shadow-sm 
          hover:shadow-md 
          hover:bg-neutral-700/80 
          transition-colors duration-300 ease-out 
          cursor-pointer 
          aspect-[3/4] 
          relative overflow-hidden"
      >

      {/* Декоративный элемент */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-sky-400/20 rotate-12 -translate-x-6 -translate-y-6 rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        {prompt.platforms &&
          prompt.platforms.map(el => 
            <div
              key={el.id}  
              className="flex items-center gap-1 bg-neutral-700/60 px-2 py-1 rounded-full"
            >
              <CustomIcon icon={el.icon} size={16} className="text-sky-400" title={el.name} />
              <span className="text-xs text-neutral-200">{el.name}</span>
            </div>  
          )
        }
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow relative z-10 mb-4 bg-neutral-800/40 rounded-xl p-4 border border-neutral-700/40">
        <h4 className="text-xl font-semibold font-opensans mb-2 text-neutral-50">
          {prompt.title}
        </h4>
        <p
          className="text-neutral-400 text-base flex-grow leading-relaxed line-clamp-5 overflow-hidden text-ellipsis"
        >
          {prompt.description}
        </p>
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-2 items-center text-xs mb-3">
        {prompt.tags?.split(",").map((tag) => (
          <span
            key={tag}
            className="bg-neutral-700/60 text-neutral-200 rounded-full px-2 py-0.5"
          >
            #{tag.trim()}
          </span>
        ))}
      </div>

      {/* Footer: категория сверху, затем теги и популярность */}
      <div className="flex items-center justify-between border-t border-neutral-700/70 pt-3 mt-3 relative z-10">
  
        {/* Левая часть — категория */}
        <div className="flex items-center gap-2">
          <Icon2 icon={prompt.Category.icon} size={16} className="text-sky-400" />
          <span className="bg-sky-400/20 text-sky-400 rounded-full px-2 py-0.5 font-medium text-xs">
            {prompt.Category.name}
          </span>
        </div>

        {/* Правая часть — популярность */}
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={14} />
          <span className="text-xs text-neutral-300">{prompt.usageCount}</span>
        </div>

      </div>

    </div>
  );
}