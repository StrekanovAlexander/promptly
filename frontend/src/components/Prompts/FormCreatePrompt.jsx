import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { createPrompt } from "@/services/api.js";
import { createSlug } from "@/utils/strings.js";

export default function FormCreatePrompt({ onClose, onCreated }) {
    const { user } = useAuth();
    const { categories } = useCategories();
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
    });

    const handleChange = (ev) => {
        if (ev.target.name === "title") {
            const slug = createSlug(ev.target.value);
            setFormData({ ...formData, [ev.target.name]: ev.target.value, slug });
        } else {
            setFormData({ ...formData, [ev.target.name]: ev.target.value });
        }
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            await createPrompt(formData);
            toast.success(`Промпт "${formData.title}" был успешно создан`);
            onCreated();
        } catch(err) {
            setError("prompt_creating", err.toString());
            toast.error("Ошибка создания промпта");
        } finally {
            onClose();
        }   
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">Создать промпт</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {/* Body */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Название */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Заголовок
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Например: SQL-запрос для аналитики"
                            />
                        </div>
                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Категория */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Категория
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Выберите категорию</option>
                                    {categories.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Теги */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Теги
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Например: SQL, аналитика, база данных"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {/* Описание */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Описание промпта
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Краткое описание для каталога"
                            />
                        </div>
                        {/* Язык */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Язык
                            </label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>            
                    {/* Тело промпта */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Текст промпта
                        </label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Введите текст промпта..."
                        />
                    </div>
                    {/* Пример ответа */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пример ответа
                        </label>
                        <textarea
                            name="response"
                            value={formData.response}
                            onChange={handleChange}
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Пример результата от ИИ..."
                        />
                    </div>
                </form>
                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white font-medium"
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
}