import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import GeneralModal from "@/components/modals/GeneralModal.jsx";
import PromptEnhancerForm from "@/components/PromptEnhancer/PromptEnhancerForm.jsx";
import Logo from "./Logo.jsx";

export default function HeaderWide() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showEnhancer, setShowEnhancer] = useState(false);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-neutral-900/80 border-b border-neutral-700 backdrop-blur-md z-50">
            {/* Широкая версия без контейнера */}
            <div className="w-full max-w-[1800px] mx-auto px-8 h-24 flex items-center justify-between">
                <Link to="/" title="Главная страница">
                    <Logo />
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-md font-medium">
                    {/* <Link
                        to="/prompt-generator"
                        className="text-sky-400 hover:text-sky-400 transition-colors"
                    >
                        Генератор промптов
                    </Link> */}
                    <Link
                        to="/prompts"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Промпты
                    </Link>
                    <Link
                        to="/run-prompt"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Запустить промпт
                    </Link>
                    <button
                        onClick={() => setShowEnhancer(true)}
                        className="hover:text-sky-400 transition-colors"
                    >
                        Улучшить промпт
                    </button>

                    {!user && 
                        <Link 
                            to="/login"
                            className="bg-neutral-800/70 border border-neutral-700/70 rounded-xl p-2 hover:border-sky-500/70 transition-all duration-300"
                        >
                            <LogIn
                                size={24}
                                className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]"
                            />
                        </Link>
                    }

                    {user && <button
                        onClick={handleLogout}
                        className="bg-neutral-800/70 border border-neutral-700/70 rounded-xl p-2 hover:border-sky-500/70 transition-all duration-300"

                    >
                        <LogOut
                            size={24}
                            className="text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]"
                        />
                    </button>
                    }
                </nav>

                {/* Кнопка меню (мобильная) */}
                <button
                    className="md:hidden text-neutral-200 hover:text-sky-400 transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>
            {/* Мобильное меню */}
            {menuOpen && (
                <div className="md:hidden bg-neutral-900/95 border-t border-neutral-700 backdrop-blur-md px-8 py-4 flex flex-col gap-4 text-sm font-medium">
                    <Link
                        to="/"
                        className="text-neutral-100 hover:text-sky-400 transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Главная страница
                    </Link>
                    <Link
                        to="/prompts"
                        className="text-neutral-100 hover:text-sky-400 transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        Промпты
                    </Link>
                    <Link
                        to="/run-prompt"
                        className="text-neutral-100 hover:text-sky-400 transition-colors"
                    >
                        Запусти промпт
                    </Link>
                </div>
            )}

            {showEnhancer && (
                <GeneralModal isOpen={showEnhancer} onClose={() => setShowEnhancer(false)}>
                    <PromptEnhancerForm />
                </GeneralModal>
            )}
        </header>
    );
}
