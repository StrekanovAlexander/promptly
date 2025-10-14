import { createContext, useContext, useState } from "react";

const PagesContext = createContext();

export default function PagesProvider({ children }) {
    const [pageTitle, setPageTitle] = useState("");

    return (
        <PagesContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </PagesContext.Provider>
    );
}

export function usePages() {
    return useContext(PagesContext);
}
