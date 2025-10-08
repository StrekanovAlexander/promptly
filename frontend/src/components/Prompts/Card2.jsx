import { Cpu, Zap, Star, Tag } from "lucide-react";

export default function Card2() {
    return (
        <div className="bg-neutral-800 
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
                relative overflow-hidden">

      {/* Декоративный элемент */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-sky-400/20 rotate-12 -translate-x-6 -translate-y-6 rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-1 bg-neutral-700/60 px-2 py-1 rounded-full">
          <Cpu size={16} className="text-sky-400" />
          <span className="text-xs text-neutral-200">ChatGPT</span>
        </div>
        <div className="flex items-center gap-1 bg-neutral-700/60 px-2 py-1 rounded-full">
          <Zap size={16} className="text-sky-400" />
          <span className="text-xs text-neutral-200">Copilot</span>
        </div>
        <div className="flex items-center gap-1 bg-neutral-700/60 px-2 py-1 rounded-full">
          <Star size={16} className="text-sky-400" />
          <span className="text-xs text-neutral-200">Claude</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow relative z-10 mb-4">
        <h4 className="text-xl font-semibold mb-2 text-neutral-50">Промпт</h4>
        <p className="text-neutral-400 text-base flex-grow leading-relaxed">
          Краткое описание промпта. Несколько строк текста,
          чтобы карточка ощущалась наполненной и визуально сбалансированной.
        </p>
      </div>

      {/* Footer: категория сверху, затем теги и популярность */}
      <div className="flex flex-col gap-2 relative z-10">
        {/* Категория с иконкой */}
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-sky-400" />
          <span className="bg-sky-400/20 text-sky-400 rounded-full px-2 py-0.5 font-medium text-xs">
            Категория
          </span>
        </div>

        {/* Теги и популярность */}
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="bg-neutral-700/60 text-neutral-200 rounded-full px-2 py-0.5">#tag1</span>
          <span className="bg-neutral-700/60 text-neutral-200 rounded-full px-2 py-0.5">#tag2</span>
          <span className="bg-neutral-700/60 text-neutral-200 rounded-full px-2 py-0.5">#tag3</span>

          {/* Популярность */}
          <span className="flex items-center gap-1 text-yellow-400 ml-auto">
            <Star size={14} /> 123
          </span>
        </div>
      </div>
    </div>
    );
}