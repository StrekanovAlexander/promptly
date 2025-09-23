import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [sortByPopularity, setSortByPopularity] = useState(true);

    const value = {
        category,
        setCategory,
        search,
        setSearch,
        sortByPopularity,
        setSortByPopularity,
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
