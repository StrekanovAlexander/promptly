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
                <Link to="/" title="Home">
                    <Logo />
                </Link>
                {/* Navigation */}
                <nav className="space-x-6 hidden md:flex">
                    <Link
                        to="/prompts"
                        className="text-gray-700 hover:text-[#a75745] font-medium"
                    >
                        Prompts
                    </Link>
                    <Link
                        to="/publications"
                        className="text-gray-700 hover:text-[#a75745] font-medium"
                    >
                        Blog
                    </Link>
                    <Link
                        to="/contacts"
                        className="text-gray-700 hover:text-[#a75745] font-medium"
                    >
                        Contacts
                    </Link>
                </nav>
                {/* Login */}
                <div className="ml-4 hidden md:flex">
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-2xl bg-[#C66E58] text-white hover:bg-[#a75745] shadow"
                    >
                        Log in
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
                            className="text-gray-700 hover:text-[#a75745] font-medium"
                            onClick={toggleMenu}
                        >
                            Prompts
                        </Link>
                        <Link
                            to="/publications"
                            className="text-gray-700 hover:text-[#a75745] font-medium"
                            onClick={toggleMenu}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/contacts"
                            className="text-gray-700 hover:text-[#a75745] font-medium"
                            onClick={toggleMenu}
                        >
                            Contacts
                        </Link>
                        <Link
                            to="/login"
                            className="mt-2 px-4 py-2 bg-[#C66E58] text-white rounded-2xl hover:hover:bg-[#a75745]"
                            onClick={toggleMenu}
                        >
                            Log in
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}