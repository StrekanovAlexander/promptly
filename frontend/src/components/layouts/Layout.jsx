import { Outlet } from "react-router-dom";
import { FiltersProvider } from "../../context/FiltersContext.jsx";
import Header from "./common/Header.jsx";
import Footer from "./common/Footer.jsx";
import PromptSidebar from "./prompt/PromptSidebar.jsx";

export default function Layout() {
  return (
    <FiltersProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="w-full flex-1 mt-[85px]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 px-4 pb-6">
                <PromptSidebar />
                <main className="flex-1">
                  <Outlet />
                </main>
            </div>
        </div>
        <Footer/>
      </div>
    </FiltersProvider>
  );
}
