import { Outlet } from "react-router-dom";
import Header from "./common/Header.jsx";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Header />
            <Outlet />
        </div>
    );
}