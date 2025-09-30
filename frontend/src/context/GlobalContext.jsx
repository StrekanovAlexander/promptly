import { createContext, useContext, useState, useEffect } from "react";
import { useApiStatus } from "./ApiStatusContext.jsx";
import { getCategories } from "@/services/api.js";

const GlobalContext = createContext();

export const useCategories = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
    const [ categories, setCategories ] = useState([]);
    const { setLoading, setError } = useApiStatus();

    useEffect(() => {
        const loadCategories = async () => {
            setLoading("categories", true);
            setError("categories", null);
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setError("categories", err.toString());
            } finally {
                setLoading("categories", false);
            }
        };

        loadCategories();
    }, []); 

    return (
        <GlobalContext.Provider value={{ categories, setCategories }}>
            {children}
        </GlobalContext.Provider>
    );
}
