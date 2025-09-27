import { useEffect, useState } from "react";
import { useFilters } from "../context/FiltersContext.jsx";
import { getPrompts } from "../services/api.js";
import PromptCard from "../components/layouts/prompt/PromptCard.jsx";
import PromptToolbar from "../components/layouts/prompt/PromptToolbar.jsx";

export default function HomePage() {
    const { promptCategory, promptSearch, promptSorting } = useFilters();
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getPrompts();
            setPrompts(data);
        })();
    }, []);

    let filteredPrompts = prompts;

    if (promptCategory !== "all") {
        filteredPrompts = prompts.filter(el => el.category === promptCategory.name);
    } 

    if (promptSearch.trim()) {
        filteredPrompts = filteredPrompts.filter(el =>
            el.title.toLowerCase().includes(promptSearch.toLowerCase()) ||
            el.body.toLowerCase().includes(promptSearch.toLowerCase())
        );
    }

    if (promptSorting === "popularity") {
        filteredPrompts = [...filteredPrompts].sort((a, b) => b.usageCount - a.usageCount);
    } else {
        filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return (
        <>
            <PromptToolbar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrompts.map(el =>  
                    <PromptCard 
                        key={ el.id } 
                        prompt={ el } 
                    />
                )}
            </div>
        </>
    );
}
