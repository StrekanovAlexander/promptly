import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Copy, Sparkles, Star, User } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { getPrompt, incrementPromptUsage } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO";
import EditPromptForm from "@/components/Prompts/EditPromptForm.jsx";
import { Difficulty, Icon2, Spinner, NeonButton } from "@/components/ui/index.jsx";
import CustomIcon from "@/components/ui/custom-icons/CustomIcon.jsx";

export default function PromptPage() {
  const { user } = useAuth();
  const { categorySlug, slug } = useParams();
  const { setLoading, setError } = useApiStatus();
  const [ prompt, setPrompt ] = useState([]);
  const [ isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const parts = slug.split('-');
  const id = parseInt(parts.pop(), 10);
  const loadPrompt = async () => {
    setLoading("prompt", true);
    setError("prompt", null);
    try {
      const data = await getPrompt(id);
      setPrompt(data);
    } catch (err) {
      setError("prompt", err.toString());
    } finally {
      setLoading("prompt", false);
    }
  };

  useEffect(() => {
    loadPrompt();
  }, []); 

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);

      try {
        await incrementPromptUsage(id);
      } catch (err) {
        console.warn("Не удалось обновить usageCount:", err.message);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // скрываем тултип через 2 сек
    } catch (err) {
      console.error("Ошибка при копировании:", err);
    }
  };

  useSEO({
    title: prompt ? prompt.title : "Загрузка — Promptly",
    description: prompt ? (prompt.description || prompt.body?.slice(0, 150)) : null,
    canonical: prompt ? `https://www.promptly.team/prompts/${categorySlug}/${slug}` : null,
    ogImage: prompt?.previewImage
  });

  const placeholders = Array.isArray(prompt.placeholders)
    ? prompt.placeholders : (prompt.placeholders ? JSON.parse(prompt.placeholders) : []);

  return (
    <div className="w-full">
      {!prompt && <Spinner />}
      {prompt &&  prompt.Category &&
        <>
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
            <Link to="/" className="hover:text-sky-400 transition-colors duration-200">Главная</Link>
            <span className="text-neutral-600">/</span>
            <Link to="/prompts" className="hover:text-sky-400 transition-colors duration-200">Промпты</Link>
            <span className="text-neutral-600">/</span>
            <Link to={`/prompts/${prompt.Category.slug}`} className="hover:text-sky-400 transition-colors duration-200">
              {prompt.Category.name}
            </Link>
            <span className="text-neutral-600">/</span>
            <span 
              className="text-neutral-300 font-medium relative"
              style={{
                textShadow: '0 0 4px rgba(56,189,248,0.5), 0 0 10px rgba(56,189,248,0.3)'
              }}
            >
              {prompt.title}
            </span>
          </nav>
          {/* Заголовок и описание промпта */}
          <section className="mt-6 mb-8">
            <div className="flex items-center gap-4 mb-4 justify-between">
              <h1 className="text-2xl md:text-3xl font-bold font-opensans text-neutral-300">
                {prompt.title}
              </h1>

              <div>
                {/* Кнопка редактирования промпта */}
                {user && prompt && user.id === prompt.userId &&  
                  <NeonButton onClick={() => setIsModalOpen(true)}>
                    Редактировать
                  </NeonButton>
                }
              </div>
            </div>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl mt-2">
              {prompt.description || prompt.Category.description}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              {/* Левая часть: категория и платформы */}
              <div className="flex items-center gap-4 flex-wrap mt-4">
                {/* Категория */}
                <div className="flex items-center gap-2">
                  <Icon2 icon={prompt.Category.icon} size={20} className="text-sky-400" />
                  <span className="bg-sky-400/20 text-sky-400 rounded-full px-2 py-0.5 font-medium text-xs">
                    {prompt.Category.name}
                  </span>
                </div>

                {/* Платформы */}
                <div className="flex items-center gap-2 flex-wrap">
                  {prompt.platforms.map((el) => (
                    <div
                      key={el.id}
                      className="flex items-center gap-1 bg-neutral-700/60 px-2 py-1 rounded-full"
                    >
                      <CustomIcon icon={el.icon} size={16} className="text-sky-400" title={el.name} />
                      <span className="text-xs text-neutral-200">{el.name}</span>
                    </div>
                  ))}
                </div>

                  {prompt.author && (
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-sky-400" />
                      <span className="text-xs text-neutral-200">{prompt.author}</span>
                    </div>
                  )}

                  {/* Лицензия */}
                  {prompt.license && (
                    <span className="text-xs text-neutral-400">Лицензия: {prompt.license}</span>
                  )}

                  {/* Индикатор сложности */}
                  <Difficulty difficulty={ prompt.difficulty } />
              </div>
              
              {/* Правая часть: популярность и дата */}
              <div className="flex items-center gap-4 text-xs text-neutral-300 mt-4">
                {/* Популярность */}
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} />
                  <span>{prompt.usageCount}</span>
                </div>
                {/* Дата создания */}
                <div className="flex items-center gap-1 text-sky-400">
                  <Calendar size={14} className="text-sky-400" />
                  <span className="text-neutral-300">
                    {new Date(prompt.createdAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).replace(/\//g, '.')}
                  </span>
                </div>
              </div>
            </div>
          </section>
                    
          <section className="mt-8 flex flex-col gap-6">
            {/* Тело промпта и плейсхолдеры */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Тело промпта */}
              <div className="w-full md:flex-1 bg-neutral-800/70 backdrop-blur-md rounded-2xl p-6 border border-neutral-700/50 select-none">
                {/* Заголовок + кнопка копирования */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-neutral-50">Текст промпта</h2>
                  <div className="relative inline-block">
                    <button
                      onClick={() => handleCopy(prompt.body, prompt.id)}
                      className="relative flex items-center gap-1 px-3 py-1.5 bg-sky-500/20 text-sky-400 rounded-lg text-sm font-medium
                                hover:bg-sky-500/30 hover:text-sky-200 transition-colors"
                      title="Скопировать текст"
                    >
                      <Copy size={16} />
                      Копировать
                      {copied && (
                        <span
                          className={`
                            absolute right-full top-1/2 -translate-y-1/2 mr-2
                            bg-neutral-100 text-neutral-900 text-xs px-2 py-1 rounded
                            shadow-[0_0_6px_rgba(56,189,248,0.6)]  /* лёгкое неоновое свечение */
                            whitespace-nowrap
                            opacity-0 pointer-events-none
                            transition-all duration-200 ease-out
                            ${copied ? "opacity-100 translate-x-0" : "translate-x-2"}
                          `}
                        >
                          Промпт был скопирован
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Содержимое промпта */}
                <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {prompt.body}
                </p>
              </div>

              {/* Плейсхолдеры */}
              {placeholders.length > 0 && (
                <div className="w-full md:w-1/3 bg-neutral-800/70 backdrop-blur-md rounded-2xl p-6 border border-neutral-700/50">
                  <h2 className="text-xl font-semibold text-neutral-50 mb-4">Плейсхолдеры</h2>
                  <div className="flex flex-col gap-3">
                    {placeholders.map((el) => (
                      <div
                        key={el.name}
                        className="bg-neutral-800/60 border border-neutral-700/50 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3"
                      >
                        {/* Название плейсхолдера */}
                        <div className="inline-block bg-neutral-700/60 text-neutral-200 text-sm font-medium px-3 py-1 rounded-full">
                          {el.name}
                        </div>
                        {/* Описание */}
                        <p className="text-neutral-400 text-sm leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
                          {el.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}  
            </div>

            {/* Пример ответа */}
            {prompt.response && (
              <section className="mt-10">
                <h3 className="text-lg font-semibold text-neutral-300 mb-4 flex items-center gap-2">
                  <Sparkles className="text-sky-400" size={18} />
                  Пример результата
                </h3>

                  <div
                  className="relative bg-neutral-800/70 border border-neutral-700/60 
                            rounded-2xl p-6 shadow-inner leading-relaxed text-neutral-200"
                >
                  <div className="flex">
                    {/* Полоска слева */}
                    <div className="w-[3px] bg-sky-400/60 rounded-l-2xl shadow-[0_0_10px_rgba(56,189,248,0.6)]"></div>

                    {/* Контент */}
                    <div className="pl-4 flex-1 whitespace-pre-line">
                      {prompt.response ? prompt.response : (
                        <p className="text-neutral-500 italic">Ответ от модели отсутствует</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Теги */}
            {prompt.tags && (
              <div className="flex flex-wrap gap-2">
                {prompt.tags.split(",").map((tag) => (
                  <span key={tag} className="bg-neutral-700/50 text-neutral-200 rounded-full px-2 py-0.5 text-xs">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </section>
          { isModalOpen && 
            <EditPromptForm 
              prompt={prompt}
              onClose={() => setIsModalOpen(false)} 
              onEdited={loadPrompt}
            />
          }
        </>
      }
    </div>
  )
}
