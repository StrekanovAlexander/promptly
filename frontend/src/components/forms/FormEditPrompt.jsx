import { useState, useEffect } from "react";
import { getCategories } from "../../services/api.js";

export default function FormEditPrompt({ isOpen, onClose, onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
    
  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body, tags, category });
    setTitle("");
    setBody("");
    setTags("");
    setCategory("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-1">
        <h2 className="text-xl font-semibold mb-4">Создать новый промпт</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Название</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Текст</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded-lg p-2"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Теги</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 bg-white"
            >
              <option value="">Выберите категорию</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 