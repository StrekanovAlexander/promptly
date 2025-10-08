import { createContext, useContext, useState, useEffect } from "react";
import { useApiStatus } from "./ApiStatusContext.jsx";
import { getCategories, getPlatforms } from "@/services/api.js";

const GlobalContext = createContext();

export const useCategories = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
    const [ categories, setCategories ] = useState([]);
    const [ platforms, setPlatforms ] = useState([]);
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

    useEffect(() => {
        const loadPlatforms = async () => {
            setLoading("platforms", true);
            setError("platforms", null);
            try {
                const data = await getPlatforms();
                setPlatforms(data);
            } catch (err) {
                setError("platforms", err.toString());
            } finally {
                setLoading("platforms", false);
            }
        };

        loadPlatforms();
    }, []); 

    return (
        <GlobalContext.Provider value={{ categories, setCategories, platforms }}>
            {children}
        </GlobalContext.Provider>
    );
}
