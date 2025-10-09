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
            <div className="flex flex-grow relative z-10 pt-[125px] px-8">
                <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto gap-4 md:gap-8">
                    {/* Сайдбар */}
                    <aside className="w-full md:w-64 shrink-0 py-8">
                        {nav}
                    </aside>

                    {/* Контент */}
                    <main className="flex-grow py-10">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Футер */}
            <Footer />
        </div>
    )
}