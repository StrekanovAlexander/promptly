import { FileText, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const classOptions = (isActive) => 
    `text-sm flex items-center gap-2 px-3 py-2 rounded-lg transition 
    ${ isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`;

export default function ProfileSidebar() {
    return (
        <aside className="w-full md:w-64 self-start bg-white rounded-lg border shadow-sm p-4 md:sticky md:top-[85px]">
            <nav className="flex flex-col gap-2">
                <NavLink
                    to="/account"
                    className={ ({ isActive }) => classOptions(isActive) }
                >
                    <User className="w-5 h-5" />Account
                </NavLink>
                <NavLink
                    to="/my-prompts"
                    className={ ({ isActive }) => classOptions(isActive) }
                >
                    <FileText className="w-5 h-5" />My prompts
                </NavLink>
            </nav>
        </aside>
    )
}
