import { Link } from "react-router-dom";
import { FileText, CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-gray-100 to-gray-50 h-[70px]">
            <div className="max-w-5xl mx-auto px-4 h-full">
                <div className="bg-white border-b rounded-bl-lg rounded-br-lg px-4 py-3 flex items-center justify-between shadow">
                    <Link to="/" className="flex items-center gap-3">
                        <Logo />
                        <span className="hidden md:block text-sm text-gray-500 italic">
                            "Prompt smarter, create faster"
                        </span>
                    </Link>    
                    <nav className="flex items-center gap-3">
                        {!user &&
                            <Link to="/login" className="text-blue-600 hover:text-blue-700">
                                <CircleUserRound className="w-5 h-5" />
                            </Link>
                        }
                        {user && 
                            <>
                                <Link to="/profile" className="text-sm text-gray-600 hover:text-blue-700 flex items-center gap-1">
                                    <FileText className="text-gray-600 hover:text-blue-700 w-4 h-4" /> Мои промпты
                                </Link>        
                            </>
                        }
                        <button onClick={() => logout()}>
                            {user?.email && <LogOut className="text-blue-600 hover:text-blue-700 w-4 h-4 ml-2" />}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
