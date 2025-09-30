import { useCategories } from "@/context/GlobalContext.jsx";
import CategorySlider from "@/components/Prompts/CategorySlider.jsx";

export default function Hero() {
    const { categories } = useCategories();
    return (
        <section className="relative bg-white py-16">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">

                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                        Найди лучшие промпты для любых задач
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl">
                        Тексты, изображения, код, маркетинг и обучение - 
                        выбирай сценарий, вдохновляйся идеями и используй в своих проектах.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-6 py-3 rounded-2xl bg-[#C66E58] text-white hover:bg-[#a75745] shadow">
                            Попробовать промпты
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-[#F9F7F5] text-gray-800 hover:bg-gray-200 shadow">
                            Добавить свой промпт
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <CategorySlider categories={categories} />
                </div>

            </div>
        </section>
    );
}