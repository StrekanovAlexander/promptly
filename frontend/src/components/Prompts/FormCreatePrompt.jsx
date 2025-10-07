import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { createPrompt } from "@/services/api.js";
import { createSlug } from "@/utils/strings.js";
import PlaceholdersEditor from "./PlaceholdersEditor.jsx";

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
        license: "",
        author: "",
        placeholders: [],
    });

    const [activeTab, setActiveTab] = useState("tab1");

    const handleChange = (ev) => {
        if (ev.target.name === "title") {
            const slug = createSlug(ev.target.value);
            setFormData({ ...formData, [ev.target.name]: ev.target.value, slug });
        } else {
            setFormData({ ...formData, [ev.target.name]: ev.target.value });
        }
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

                    <div>
                        <div className="flex border-b border-gray-300 mb-4">
                            <button
                                type="button"
                                className={`px-4 py-2 -mb-px font-medium text-sm ${
                                    activeTab === "tab1"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                                onClick={() => setActiveTab("tab1")}
                            >
                                Текст промпта
                            </button>

                            <button
                                type="button"
                                className={`px-4 py-2 -mb-px font-medium text-sm ${
                                    activeTab === "tab2"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                                onClick={() => setActiveTab("tab2")}
                            >
                                Пример ответа
                            </button>

                            <button
                                type="button"
                                className={`px-4 py-2 -mb-px font-medium text-sm ${
                                    activeTab === "tab3"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                                onClick={() => setActiveTab("tab3")}
                            >
                                Плейсхолдеры
                            </button>

                            <button
                                type="button"
                                className={`px-4 py-2 -mb-px font-medium text-sm ${
                                    activeTab === "tab4"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                                onClick={() => setActiveTab("tab4")}
                            >
                                Разное
                            </button>

                        </div>
                        {/* Контент вкладок */}
                        <div>
                            {activeTab === "tab1" && 
                                <textarea
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    rows={14}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Введите текст промпта..."
                                />
                            }
                            {activeTab === "tab2" &&
                                <textarea
                                    name="response"
                                    value={formData.response}
                                    onChange={handleChange}
                                    rows={14}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Пример ответа от ИИ..."
                                /> 
                            }
                            {activeTab === "tab3" &&
                                <PlaceholdersEditor 
                                    initialPlaceholders={formData.placeholders}
                                    onChange={handlePlaceholdersChange}
                                /> 
                            }
                            {activeTab === "tab4" &&
                                <>
                                    <div className="mb-4">
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Лицензия
                                            </label>
                                            <input
                                                type="text"
                                                name="license"
                                                value={formData.license}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Автор
                                            </label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
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
                                </>
                            }
                        </div>
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