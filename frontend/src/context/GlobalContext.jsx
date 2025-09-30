import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useCategories = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
    const [categories, setCategories] = useState([]);

    return (
        <GlobalContext.Provider value={{ categories, setCategories }}>
            {children}
        </GlobalContext.Provider>
    );
}
