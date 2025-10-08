import Card2 from "@/components/Prompts/Card2.jsx";

export default function SketchIndex() {
  return (

    <>
    {/* Слоган */}
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-opensans font-bold mb-4">
        Найди свой идеальный промпт
      </h2>
      <p className="text-neutral-400 text-lg">
        Библиотека лучших промптов для генеративного ИИ
      </p>
    </section>

    {/* Форма поиска */}
    <section className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Поиск по промптам..."
        className="w-full max-w-xl rounded-xl bg-neutral-700/90 px-4 py-3 text-base border border-sky-600 text-neutral-100 placeholder-neutral-400
                   focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition"
      />
    </section>

    {/* Заголовок недавно добавленных */}
    <section className="mt-10 flex flex-col items-center">
      <h3 className="text-3xl font-semibold font-opensans mb-8 text-center">
        Недавно добавленные
      </h3>

      {/* Портретные карточки 2x4 */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card2 key={idx} />
          // <div
          //   key={idx}
          //   className="bg-neutral-800/70 backdrop-blur-md border border-neutral-700
          //              p-6 flex flex-col justify-between
          //              rounded-t-2xl rounded-b-xl hover:rounded-2xl
          //              shadow-sm hover:shadow-md
          //              hover:scale-102 transition-all duration-300 ease-out
          //              cursor-pointer aspect-[3/4] relative overflow-hidden"
          // >
            // {/* Лёгкая асимметрия через псевдоэлемент */}
            // <div className="absolute top-0 left-0 w-16 h-16 bg-sky-400/20 rotate-12 -translate-x-6 -translate-y-6 rounded-full pointer-events-none"></div>

            // {/* Контент */}
            // <div className="flex flex-col flex-grow relative z-10">
            //   <h4 className="text-xl font-semibold mb-2">
            //     Промпт {idx + 1}
            //   </h4>
            //   <p className="text-neutral-400 text-base flex-grow leading-relaxed">
            //     Краткое описание промпта {idx + 1}. Несколько строк текста,
            //     чтобы карточка ощущалась наполненной и визуально сбалансированной.
            //   </p>
            // </div>

          //  {/* Теги и кнопка */}
          //   <div className="mt-4 text-sm text-neutral-400 flex justify-between items-center relative z-10">
          //     <span className="bg-sky-400/20 text-sky-400 rounded-full px-3 py-1 text-xs font-medium">
          //       #tag{idx + 1}
          //     </span>
          //     <button className="text-sky-400 hover:text-sky-300 font-medium">
          //       Подробнее →
          //     </button>
          //   </div>
          // </div>
        ))}
      </div>
    </section>
    </>
  
  );
}
