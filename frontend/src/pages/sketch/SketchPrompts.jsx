export default function SketchPrompts() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-neutral-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-20">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Promptly</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-sky-400 transition-colors">Каталог</a>
          <a href="#" className="hover:text-sky-400 transition-colors">Создать</a>
          <a href="#" className="hover:text-sky-400 transition-colors">О нас</a>
        </nav>
      </header>

      {/* Search / Filters */}
      <section className="px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по промптам..."
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm border border-white/10 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition text-neutral-100">Популярные</button>
          <button className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition text-neutral-100">Новые</button>
          <button className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition text-neutral-100">Избранные</button>
        </div>
      </section>

      {/* Main */}
      <main className="flex flex-1 px-8 py-10 gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 gap-3">
          <h2 className="text-lg font-medium mb-2 text-white/90">Категории</h2>
          <div className="flex flex-col gap-2">
            <button className="text-left text-sm hover:text-sky-400 transition">🎨 Арт</button>
            <button className="text-left text-sm hover:text-sky-400 transition">💬 Общение</button>
            <button className="text-left text-sm hover:text-sky-400 transition">📚 Обучение</button>
            <button className="text-left text-sm hover:text-sky-400 transition">💼 Продуктивность</button>
            <button className="text-left text-sm hover:text-sky-400 transition">🧠 Исследования</button>
          </div>
        </aside>

        {/* Grid с 12 карточками */}
        <section className="grid flex-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
  {Array.from({ length: 9 }).map((_, idx) => (
    <div
      key={idx}
      className="rounded-2xl bg-neutral-900/70 border border-white/10 p-8 hover:border-sky-400/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition flex flex-col justify-between min-h-[250px]"
    >
      <div>
        <h3 className="text-xl font-semibold mb-3 text-white">
          Промпт {idx + 1}
        </h3>
        <p className="text-base text-neutral-400">
          Краткое описание промпта {idx + 1}. Чуть больше текста, чтобы визуально оценить размер карточки и читаемость.
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-neutral-500">
        <span>#tag{idx + 1}</span>
        <button className="text-sky-400 hover:text-sky-300 font-medium">Подробнее →</button>
      </div>
    </div>
  ))}
</section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 text-sm text-neutral-500 border-t border-white/10 bg-white/5 backdrop-blur-md">
        © 2025 Promptly. Все права защищены.
      </footer>
    </div>
    );
}