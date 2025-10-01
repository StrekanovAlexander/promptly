import PromptCard from "@/components/Prompts/Card.jsx";
// Фейковые данные
const prompts = [
  { id: 1, title: "Промпт 1", body: "Текст промпта...", response: "Ответ ИИ...", usageCount: 10, isFavorite: false, tags: "tag1,tag2", Category: { name: "Программирование", icon: "Code" } },
  { id: 2, title: "Промпт 2", body: "Текст промпта...", response: "Ответ ИИ...", usageCount: 5, isFavorite: true, tags: "tag3,tag4", Category: { name: "Дизайн", icon: "PenTool" } },
  { id: 3, title: "Промпт 3", body: "Текст промпта...", response: "Ответ ИИ...", usageCount: 7, isFavorite: false, tags: "tag5", Category: { name: "Маркетинг", icon: "Megaphone" } },
];

export default function PromptsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-opensans font-semibold text-gray-800 mb-6">
                Библиотека промптов
            </h1>

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
  {/* Поиск */}
  <input
    type="text"
    placeholder="Найти промпт..."
    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Сортировка */}
  <select
    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="popular">Популярные</option>
    <option value="newest">Новые</option>
    <option value="title">По наименованию</option>
  </select>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
        </div>
    );
}
