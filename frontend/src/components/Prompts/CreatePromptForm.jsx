import { useState } from "react";

export default function CreatePromptForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div className="bg-white text-neutral-900 rounded-2xl w-[95%] max-w-[1400px] max-h-[95vh] overflow-y-auto shadow-xl p-12 relative">
    
    {/* Заголовок */}
    <h2 className="text-3xl font-semibold mb-8">
      Создать новый промпт
    </h2>

    {/* Контент формы */}
    <form className="flex flex-col gap-6">
      <input
  type="text"
  placeholder="Название промпта"
  className="w-full max-w-lg rounded-lg border border-neutral-300 p-1 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
/>
      <textarea
        placeholder="Описание промпта"
        className="w-full rounded-lg border border-neutral-300 p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none h-40"
      />
      <textarea
        placeholder="Текст промпта"
        className="w-full rounded-lg border border-neutral-300 p-4 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none h-60"
      />

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
