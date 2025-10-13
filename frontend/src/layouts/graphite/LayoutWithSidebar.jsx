import { Outlet } from "react-router-dom";
import HeaderWide from "./HeaderWide.jsx";
import Footer from "./Footer.jsx";

export default function LayoutWithSidebar({ nav }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 text-neutral-100">

            {/* Хедер */}
            <HeaderWide />

            {/* Основная область */}
            <div className="flex flex-col md:flex-row w-full px-8 mt-24 flex-1 gap-8">

                {/* Сайдбар */}
                <aside className="w-full md:w-64 md:flex-shrink-0 py-8 pr-6 overflow-auto">
                    {nav}
                </aside>

                {/* Контент */}
                <main className="flex-1 py-10">
                    <Outlet />
                </main>

            </div>

            {/* Футер */}
            <Footer />

        </div>
    );
}
