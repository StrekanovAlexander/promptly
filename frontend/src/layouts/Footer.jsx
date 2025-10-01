import { Aperture } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#FAFAFA] border-t border-gray-200 mt-16 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Логотип + слоган */}
                <div className="flex items-center gap-2">
                    <Aperture className="w-6 h-6 text-[#4F8EF7] drop-shadow-sm" />
                    <span className="text-gray-700 font-medium text-sm">
                        Promptly — библиотека промптов для ИИ
                    </span>
                </div>
                {/* Навигация */}
                <nav className="flex space-x-4 text-gray-500 text-sm">
                    <a href="/prompts" className="hover:text-[#4F8EF7] transition">Prompts</a>
                    <a href="/blog" className="hover:text-[#4F8EF7] transition">Blog</a>
                    <a href="/contacts" className="hover:text-[#4F8EF7] transition">Contacts</a>
                </nav>
                {/* Копирайт */}
                <div className="text-gray-400 text-xs">
                    &copy; {(new Date()).getFullYear()} Promptly. Все права защищены.
                </div>
            </div>
        </footer>
    );
} 