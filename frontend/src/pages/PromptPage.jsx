import { Link } from "react-router-dom";

export default function PromptPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Хлебные крошки */}
            <nav className="text-sm text-gray-500 mb-4">
                <Link to="/prompts" className="hover:underline">Промпты</Link>
                <span className="mx-2">/</span>
                <span>Текущий промпт</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-6">
                Заголовок промпта
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
                {/* <Icon icon={prompt.Category.icon} size={4} /> {prompt.Category.name} */}
                    Иконка и категория
                </span>
                {/* {prompt.tags?.split(",").map((tag) => ( */}
                    <span 
                        // key={tag} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {/* {tag} */} Теги
                    </span>
                {/* ))} */}
            </div>

            {/* Содержимое промпта */}
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          {/* <p className="text-gray-700 whitespace-pre-wrap">{prompt.body}</p> */}
          <p className="text-gray-700 whitespace-pre-wrap">Тело промпта</p>
        </div>

        {/* Пример результата */}
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Пример результата</h2>
          {/* <p className="text-gray-700 whitespace-pre-wrap">{prompt.response}</p> */}
          <p className="text-gray-700 whitespace-pre-wrap">Результат</p>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm">
            Скопировать
          </button>
          {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm">
            Изменить
          </button> */}
        </div>
              
        </div>
    )
}