import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import Logo from "./Logo.jsx";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-neutral-900/80 border-b border-neutral-700 backdrop-blur-md z-50">
            <div className="container mx-auto px-6 py-6 flex items-center justify-between">
                <Link to="/" title="Главная страница">
                    <Logo />
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-md font-medium">
                    <Link
                        to="/prompts"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Промпты
                    </Link>
                    {user && <button
                        onClick={handleLogout}
                        className="hover:text-sky-400 transition-colors"
                    >
                        Выход
                    </button>
                    }
                </nav>
                {/* Кнопка меню (только мобильная) */}
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
                <div className="md:hidden bg-neutral-900/95 border-t border-neutral-700 backdrop-blur-md px-6 py-4 flex flex-col gap-4 text-sm font-medium">
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
                </div>
            )}
        </header>
    );
}