import { createContext, useContext, useState } from "react";

const PostFiltersContext = createContext();

export function PostFiltersProvider({ children }) {
    const [postCategory, setPostCategory] = useState("all");
    const [postSearch, setPostSearch] = useState("");
    const [postSorting, setPostSorting] = useState("newest");

    const value = {
        postCategory,
        setPostCategory,
        postSearch, 
        setPostSearch,
        postSorting, 
        setPostSorting
    };

    return (
        <PostFiltersContext.Provider value={value}>
            {children}
        </PostFiltersContext.Provider>
    );
}

export function useFilters() {
    return useContext(PostFiltersContext);
}
