import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { createPrompt } from "@/services/api.js";
import { createSlug } from "@/utils/strings.js";
import PlaceholdersEditor from "./PlaceholdersEditor.jsx";

export default function CreatePromptForm({ onClose, onCreated }) {
  const { user } = useAuth();
  const { categories, platforms } = useCategories();
  const { setError } = useApiStatus();
  const [formData, setFormData] = useState({
    categoryId: "",
    userId: user.id,
    title: "",
    slug: "",
    body: "",
    response: "",
    description: "",
    tags: "",
    language: "ru",
    license: "",
    author: "",
    placeholders: [],
    difficulty: "",
    platforms: []
  });

  const handleChange = (ev) => {
    if (ev.target.name === "title") {
      const slug = createSlug(ev.target.value);
    setFormData({ ...formData, [ev.target.name]: ev.target.value, slug });
    } else {
      setFormData({ ...formData, [ev.target.name]: ev.target.value });
    }
  };

  const handlePlatformChange = (ev) => {
    const id = Number(ev.target.value);
    setFormData((prev) => ({
      ...prev, 
      platforms: prev.platforms.includes(id) 
        ? prev.platforms.filter((item) => item !== id) 
        : [...prev.platforms, id]
    }));
  };

  const handlePlaceholdersChange = (newPlaceholders) => {
    setFormData((prev) => ({ ...prev, placeholders: newPlaceholders }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const payload = { ...formData, placeholders: JSON.stringify(formData.placeholders) };
    try {
      await createPrompt(payload);
      toast.success(`Промпт был успешно создан`);
      onCreated();
    } catch(err) {
      setError("prompt_creating", err.toString());
      toast.error("Ошибка создания промпта");
    } finally {
      onClose();
    }   
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white text-neutral-900 rounded-2xl w-[95%] max-w-[1400px] max-h-[95vh] overflow-y-auto shadow-xl p-12 relative">
        
        {/* Шапка */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold mb-8">
            Создать новый промпт
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Контент формы */}
        <form 
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >

           {/* Секция 1: Заголовок Slug */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row w-full gap-4">
            {/* Title */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название промпта
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Например: SQL-запрос для аналитики"
                className="w-full rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Slug */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                placeholder="Slug"
                value={formData.slug}
                readOnly
                className="w-full rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

          </div>

          {/* Секция 2: Описание Категория Автор Лицензия */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row w-full gap-4">
            <div className="flex-1">   
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>   
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={1}
                placeholder="Описание промпта"
                className="w-full rounded-lg border border-neutral-300 p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            <div className="flex-1 flex gap-4">
              {/* Категория */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория
                </label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Выбор ...</option>
                        {categories.map((el) => (
                        <option key={el.id} value={el.id}>
                            {el.name}
                        </option>
                    ))}
                </select>
              </div>

              {/* Сложность */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Сложность
                </label>
                <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Выбор ...</option>
                  <option value="easy">Легко</option>
                  <option value="middle">Средне</option>
                  <option value="hard">Тяжело</option>
                </select>
              </div>

              {/* Автор */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Автор
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Автор"
                  className="w-full rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Лицензия */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Лицензия
                </label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  placeholder="Лицензия"
                  className="w-full rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

            </div>

          </div>
                 
          {/* Секция 3: Платформы */}
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row w-full gap-4">
            {/* Платформы */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Платформы
              </label>
              <div className="flex gap-4 px-2 py-2">
                {platforms.map((el) => (
                  <div key={el.id} className="text-gray-700">
                    <label
                      key={el.id}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        value={el.id} 
                        checked={formData.platforms.includes(el.id)}
                        onChange={handlePlatformChange}
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                        <span>
                          {el.name}
                        </span>
                    </label>
                  </div>
                ))} 
              </div>
            </div>

             {/* Теги */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Теги
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                required
                placeholder="Теги"
                className="w-full rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

             {/* Статус */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Статус
              </label>
              <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="published">Опубликован</option>
                <option value="draft">Черновик</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Видимость
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="public">Открытый</option>
                <option value="private">Приватный</option>
              </select>
            </div>

          </div>
    
          {/* Секция 4 */}      
          <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row w-full gap-6">
            <div className="flex-1"> 
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст промпта
              </label>         
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={5}
                placeholder="Текст промпта"
                className="w-full rounded-lg border border-neutral-300 p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none h-60"
              />
            </div>
            <div className="flex-1"> 
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Плейсхолдеры
              </label>         
              <PlaceholdersEditor 
                initialPlaceholders={formData.placeholders}
                onChange={handlePlaceholdersChange}
              />
            </div>
          </div>

        {/* Секция 5. Пример ответа */}
          <div>   
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пример ответа ИИ
            </label>   
            <textarea
              name="response"
              value={formData.response}
              onChange={handleChange}
              rows={8}
              placeholder="Пример ответа ИИ"
              className="w-full rounded-lg border border-neutral-300 p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            />
          </div>  

          {/* Футер с кнопками */}
          <div className="flex justify-end gap-6 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              Сохранить
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
