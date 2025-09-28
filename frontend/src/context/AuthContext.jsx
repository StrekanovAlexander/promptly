import { createContext, useContext, useState, useEffect } from "react";
import { parseJwt } from "../utils/tokens.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = parseJwt(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({
                        id: decoded.userId,
                        email: decoded.email,
                        role: decoded.role,
                        token
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch {
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token); 
        setUser(userData); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const updateUser = (newUser) => {
        setUser(newUser); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
