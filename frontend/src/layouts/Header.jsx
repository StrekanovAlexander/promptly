import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../components/Logo/Logo.jsx";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Logo />
                {/* Navigation */}
                <nav className="space-x-6 hidden md:flex">
                    <Link
                        to="/prompts"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Промпты
                    </Link>
                    <Link
                        to="/publications"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Публикации
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        О проекте
                    </Link>
                    <Link
                        to="/contacts"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Контакты
                    </Link>
                </nav>
                {/* Login */}
                <div className="ml-4 hidden md:flex">
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-2xl bg-[#C66E58] text-white hover:bg-[#a75745] shadow"
                    >
                        Вход
                    </Link>
                </div>
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
                            className="text-gray-700 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            Промпты
                        </Link>
                        <Link
                            to="/publications"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            Публикации
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            О проекте
                        </Link>
                        <Link
                            to="/contacts"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            Контакты
                        </Link>
                        <Link
                            to="/login"
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={toggleMenu}
                        >
                            Вход
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}