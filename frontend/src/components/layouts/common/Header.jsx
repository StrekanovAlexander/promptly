import { User, FileText, House, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-gray-100 to-gray-50 h-[70px]">
            <div className="max-w-5xl mx-auto px-4 h-full">
                <div className="bg-white border-b rounded-bl-lg rounded-br-lg px-4 py-3 flex items-center justify-between shadow">
                    <div className="flex flex-col mr-2">
                        <a href="/" title="Начало">
                            <Logo />
                        </a>
                        <span className="text-xs text-gray-500">
                            your community at promptly.team
                        </span>
                    </div>
                    <nav className="flex">
                        <ul className="flex items-center list-none gap-6">
                            <li>
                                <a href="/" className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-1">
                                    <House className="w-5 h-5" />Home
                                </a>
                            </li>
                            <li>
                                <a href="/posts" className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-1">
                                    <FileText className="w-5 h-5" />Articles
                                </a>
                            </li>
                        {!user &&
                            <li>
                                <a href="/login" className="text-gray-500 hover:text-blue-600">
                                    <User className="w-5 h-5" />
                                </a>
                            </li>
                        }
                        {user &&
                            <>
                                <li>
                                    <a href="/account" className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-1">
                                        <Settings className="w-5 h-5" />Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                        onClick={handleLogout} 
                                        className="text-gray-500 hover:text-blue-600 bg-yellow-300"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </a>
                                </li>
                            </>
                        }
                        </ul>
                    </nav>  
                </div>
            </div>
        </header>
    )
}
