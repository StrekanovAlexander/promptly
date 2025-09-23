import { FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserSidebar() {
    return (
        <aside className="w-full md:w-64 self-start bg-white rounded-lg border shadow-sm p-4 md:sticky md:top-[85px]">
            <nav className="flex flex-col gap-2">
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `text-sm flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                        isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FileText className="w-5 h-5" /> Мои промпты
                </NavLink>
            </nav>
        </aside>
    )
}
