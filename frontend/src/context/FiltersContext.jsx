import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    
    const [filterSearch, setFilterSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sorting, setSorting] = useState("newest");
    const [filterPlatforms, setFilterPlatforms] = useState([]);

    const togglePlatform = (platformId) => {
        setFilterPlatforms((prev) =>
        prev.includes(platformId)
            ? prev.filter((id) => id !== platformId)
            : [...prev, platformId]
        );
  };
    
//     const [promptCategory, setPromptCategory] = useState("all");        // !!!!! Done
//     const [promptSearch, setPromptSearch] = useState("");               // !!!!! Done
//     const [promptSorting, setPromptSorting] = useState("popularity");   // !!!!! Done
// 
//     const [postCategory, setPostCategory] = useState("all");
//     const [postSearch, setPostSearch] = useState("");
//     const [postSorting, setPostSorting] = useState("newest");

    const value = {
        filterSearch,  
        setFilterSearch,
        filterCategory, 
        setFilterCategory,
        sorting, 
        setSorting,
        filterPlatforms,
        togglePlatform
        
        // promptCategory,
        // setPromptCategory,
        // promptSearch,
        // setPromptSearch,
        // promptSorting, 
        // setPromptSorting,
        // postCategory, 
        // setPostCategory,
        // postSearch, 
        // setPostSearch,
        // postSorting, 
        // setPostSorting
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
