import { useNavigate } from "react-router-dom";

export function useAuth() {
    const navigate = useNavigate();
    
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return { logout };
}