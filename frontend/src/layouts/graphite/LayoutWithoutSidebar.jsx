import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function LayoutWithoutSidebar() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-neutral-100 flex flex-col overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm pointer-events-none"></div>
            <Header />
            
            {/* <main className="flex-grow relative z-10"> */}
            <main className="container mx-auto px-6 py-10 flex flex-col gap-10 relative z-10 pt-[125px]">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}