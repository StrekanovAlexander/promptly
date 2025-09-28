import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { parseJwt } from "../../utils/tokens.js";

export default function OAuthCallback() {
    const { updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            
            const decoded = parseJwt(token);
            const userObj = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role,
                token
            };
            updateUser(userObj);

            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, "", newUrl);
            
            navigate("/account");
        }
    }, [navigate]);

    return <p>Login handle...</p>;
}
