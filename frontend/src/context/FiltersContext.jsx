import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    
    const [filterCategory, setFilterCategory] = useState("all");
    
    const [promptCategory, setPromptCategory] = useState("all"); // !!!!!
    const [promptSearch, setPromptSearch] = useState(""); // !!!!!! filterPrompt
    const [promptSorting, setPromptSorting] = useState("popularity");

    const [postCategory, setPostCategory] = useState("all");
    const [postSearch, setPostSearch] = useState("");
    const [postSorting, setPostSorting] = useState("newest");

    const value = {
        filterCategory, 
        setFilterCategory,
        
        promptCategory,
        setPromptCategory,
        promptSearch,
        setPromptSearch,
        promptSorting, 
        setPromptSorting,
        postCategory, 
        setPostCategory,
        postSearch, 
        setPostSearch,
        postSorting, 
        setPostSorting
    };

    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    );
}

export function useFilters() {
    return useContext(FiltersContext);
}
