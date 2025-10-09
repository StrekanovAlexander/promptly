import { Outlet } from "react-router-dom";
import HeaderWide from "./HeaderWide.jsx";
import Footer from "./Footer.jsx";

export default function LayoutWithSidebar({ nav }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-neutral-100 flex flex-col overflow-hidden">
            {/* Фон и эффект размытия */}
            <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm pointer-events-none"></div>

            {/* Хедер */}
            <HeaderWide />

            {/* Основная область */}
            <div className="flex flex-grow relative z-10 pt-[125px]">
                <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row gap-8 px-8 relative">
                
                {/* Сайдбар */}
                <aside className="hidden md:block w-64 h-[calc(100vh-125px)] fixed top-[125px] left-[calc((100%-1800px)/2)] py-8 pr-6 border-r border-neutral-700/50 bg-neutral-900/40 backdrop-blur-md">
                    {nav}
                </aside>

                {/* Контент */}
                <main className="flex-grow md:ml-64 px-6 py-10">
                    <Outlet />
                </main>

                </div>
            </div>

            {/* Футер */}
            <Footer />
        </div>
    )
}