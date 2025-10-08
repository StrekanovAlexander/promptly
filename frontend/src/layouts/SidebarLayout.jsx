import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function SidebarLayout({ nav }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <Header />
            <div className="flex flex-1 container mx-auto px-4 py-8 gap-6">
                {/* Sidebar */}
                <aside className="w-64 hidden lg:block">
                    { nav }
                </aside>
                {/* Основной контент */}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}