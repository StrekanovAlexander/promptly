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

          <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                <Icon icon={prompt.Category.icon} size={4} /> {prompt.Category.name}
              </span>
              {prompt.tags?.split(",").map((tag) => ( 
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>
          {/* Краткое описание промпта */}     
          <p className="text-gray-700 my-4 text-sm">
            Краткое описание промпта: {prompt.description}
          </p>
          {/* Содержимое промпта */}
          <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">
              {prompt.body}
            </p>
          </div>
          {/* Пример результата */}
          <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Пример результата</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{prompt.response}</p>
          </div>
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
