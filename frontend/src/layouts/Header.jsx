import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import Logo from "../components/Logo/Logo.jsx";

export default function Header() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/" title="Home">
                    <Logo />
                </Link>
                {/* Navigation */}
                <nav className="space-x-8 hidden md:flex items-center">
                    <Link
                        to="/prompts"
                        className="text-gray-700 hover:text-[#4F8EF7] font-medium"
                    >
                        Промпты
                    </Link>
                    {user && <button
                        onClick={handleLogout}
                        className="bg-white text-gray-700 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-xl font-medium transition"
                    >
                        Выход
                    </button>

                    }
                    {/* <Link
                        to="/publications"
                        className="text-gray-700 hover:text-[#4F8EF7] font-medium"
                    >
                        Публикации
                    </Link>
                    <Link
                        to="/contacts"
                        className="text-gray-700 hover:hover:text-[#4F8EF7] font-medium"
                    >
                        Контакты
                    </Link> */}
                </nav>
                {/* Login */}
                <div className="text-gray-400 text-sm">
                    {new Date().toLocaleString('ru-RU', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        hour: '2-digit', 
                        minute:'2-digit' 
                    })}
                </div>
                {/* <div className="ml-4 hidden md:flex">
                    <Link
                        to="/login"
                        className="bg-[#4F8EF7] hover:bg-[#3A6DD1] text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition font-medium text-sm"
                    >
                        Вход
                    </Link>
                </div> */}
                {/* Burger-Menu */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col px-4 py-4 space-y-2">
                        <Link
                            to="/prompts"
                            className="text-gray-700 hover:hover:text-[#4F8EF7] font-medium"
                            onClick={toggleMenu}
                        >
                            Промпты
                        </Link>
                        {/* <Link
                            to="/publications"
                            className="text-gray-700 hover:hover:text-[#4F8EF7] font-medium"
                            onClick={toggleMenu}
                        >
                            Публикации
                        </Link>
                        <Link
                            to="/contacts"
                            className="text-gray-700 hover:hover:text-[#4F8EF7] font-medium"
                            onClick={toggleMenu}
                        >
                            Контакты
                        </Link> */}
                    </nav>
                </div>
            )}
        </header>
    )
}