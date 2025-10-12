import { Outlet } from "react-router-dom";
import HeaderWide from "./HeaderWide.jsx";
import Footer from "./Footer.jsx";

export default function LayoutWithoutSidebar() {
    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 text-neutral-100 overflow-hidden">
            <HeaderWide className="relative z-20" />
            <main className="flex-grow relative z-10">
                <section className="w-full">
                    <Outlet />
                </section>
            </main>
            <Footer className="relative z-20 mt-auto" />
        </div>
    );
}