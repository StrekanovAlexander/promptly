import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import UserSidebar from "./user/UserSideBar.jsx";

export default function UserLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="w-full flex-1 mt-[85px]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 px-4 pb-6">
                <UserSidebar />
                <main className="flex-1">
                  <Outlet />
                </main>
            </div>
        </div>
        <Footer/>
      </div>
    );
}