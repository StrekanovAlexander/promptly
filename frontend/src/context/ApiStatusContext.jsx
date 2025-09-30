import { createContext, useContext, useState } from "react";

const ApiStatusContext = createContext();

export const useApiStatus = () => useContext(ApiStatusContext);

export function ApiStatusProvider({ children }) {
    const [status, setStatus] = useState({}); 

    const setLoading = (key, value) => {
        setStatus(prev => ({
            ...prev,
            [key]: { ...prev[key], isLoading: value }
        }));
    };

    const setError = (key, value) => {
        setStatus(prev => ({
            ...prev,
            [key]: { ...prev[key], error: value }
        }));
    };

    return (
        <ApiStatusContext.Provider value={{ status, setLoading, setError }}>
            {children}
        </ApiStatusContext.Provider>
    );
}