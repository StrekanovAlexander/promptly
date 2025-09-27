import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OAuthCallback() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const username = params.get("username");
        const email = params.get("email");

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({ name: username, email }));
            setUser(localStorage.getItem("user"));

            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, "", newUrl);
            
            navigate("/profile");
        }
    }, [navigate]);

    return <p>Login handle ...</p>;
}