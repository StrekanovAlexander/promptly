import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { getPrompt } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO";
import FormEditPrompt from "@/components/Prompts/FormEditPrompt.jsx";
import { Icon, Spinner } from "@/components/ui/index.jsx";

export default function PromptPage() {
  const { user } = useAuth();
  const { categorySlug, slug } = useParams();
  const { setLoading, setError } = useApiStatus();
  const [ prompt, setPrompt ] = useState([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const parts = slug.split('-');
  const id = parseInt(parts.pop(), 10);
  const placeholders = normalizePlaceholders(prompt?.placeholders || []);

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

  useSEO({
    title: prompt ? prompt.title : "Загрузка — Promptly",
    description: prompt ? (prompt.description || prompt.body?.slice(0, 150)) : null,
    canonical: prompt ? `https://www.promptly.team/prompts/${categorySlug}/${slug}` : null,
    ogImage: prompt?.previewImage
  });

  return (
    <div className="flex flex-col gap-6">
      {!prompt && <Spinner />}
      {/* Хлебные крошки */}
      {prompt &&  prompt.Category &&
        <>
          <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
              <Link to="/prompts" className="hover:underline">Промпты</Link>
              <span className="mx-2">/</span>
              <Link to={`/prompts/${prompt.Category.slug}`} className="hover:underline">
                {prompt.Category.name}
              </Link>
              <span className="mx-2">/</span>
              <span>{prompt.title}</span>
          </nav>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-6">
              { prompt.title }
            </h1>
            {user &&
              <button
                onClick={() => setIsModalOpen(true)} 
                className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm transition font-medium text-sm"
              >
                Редактировать
              </button>
            }
          </div>

          {/* Категория и теги */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
              <Icon icon={prompt.Category.icon} size={4} /> {prompt.Category.name}
            </span>
            {prompt.tags &&
              prompt.tags.split(",").map((tag) => (
                <span
                  key={tag.trim()}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
          </div>

          {/* Краткое описание промпта */}     
          {prompt.description && (
            <div className="border-l-4 border-blue-400 pl-4 text-gray-700">
              <p className="text-sm leading-relaxed">
                {prompt.description}
              </p>
            </div>
          )}

          {/* Содержимое промпта */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Содержимое промпта
            </h2>
            <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {prompt.body}
            </pre>
          </div>
          {/* Пример результата */}
          {prompt.response && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Пример результата
              </h2>
              <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {prompt.response}
              </pre>
            </div>
          )}
          {/* Плейсхолдеры (если есть) */}
          {prompt.placeholders && prompt.placeholders.length > 0 && (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Переменные (Placeholders)
              </h2>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="py-2 px-3 text-gray-700 font-medium">Имя</th>
                    <th className="py-2 px-3 text-gray-700 font-medium">Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {placeholders.map((ph, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-800 font-mono">{ph.name}</td>
                      <td className="py-2 px-3 text-gray-700">{ph.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm">
              Скопировать
            </button>
          </div>
          { isModalOpen && 
            <FormEditPrompt 
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

function normalizePlaceholders(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  if (typeof value === "object" && value !== null) {
    if ("name" in value && "description" in value) return [value];
    return [];
  }
  return [];
}
