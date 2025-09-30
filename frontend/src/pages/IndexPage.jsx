import { useState } from "react";
import Header from "@/layouts/Header.jsx";
import Hero from "@/layouts/Hero.jsx";
import PromptCard from "@/components/Prompts/PromptCard.jsx";
import GuideCard from "@/components/Guides/GuideCard.jsx";
import prompts from "@/config/promptConfig.js";

export default function IndexPage() {
  const [selectedPromptCategory, setSelectedPromptCategory] = useState(null);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Популярные промпты</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {prompts.slice(0,4).map((el) => (
              <PromptCard key={el.id} prompt={el} />
            ))}
          </div>
        </section>
    
        <section className="py-16 border-b">
          <h2 className="text-2xl font-bold mb-6 text-center">Гайды и обучение</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <GuideCard
              title="Как писать эффективные промпты для ChatGPT"
              description="Пошаговое руководство, которое поможет вам создавать промпты, получающие лучшие результаты."
              author="Alex"
              date="29.09.2025"
            />
            <GuideCard
              title="Промпты для генерации кода: примеры и советы"
              description="Используйте эти шаблоны для быстрого написания кода с помощью ИИ."
              author="Maria"
              date="28.09.2025"
            />
            <GuideCard
              title="Маркетинговые промпты: как создавать вирусный контент"
              description="Учимся писать промпты для генерации креативного контента, который вовлекает аудиторию."
              author="Ivan"
              date="27.09.2025"
            />
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-inner py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2025 Promptly. Все права защищены.
        </div>
      </footer>
    </div>
    )
}