import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/tokens.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = parseJwt(token);
                setUser({ ...decoded, token });
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser({ ...userData, token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser: updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}