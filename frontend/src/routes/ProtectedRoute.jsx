import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/icons/Spinner.jsx";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner />;
    }    

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}