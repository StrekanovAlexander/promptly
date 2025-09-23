import { useEffect, useState } from "react";
import { useFilters } from "../context/FiltersContext.jsx";
import { getPrompts } from "../services/api.js";
import Card from "../components/cards/Card.jsx";
import PromtsToolbar from "../components/layouts/PromtsToolbar.jsx";

export default function HomePage() {
    const { category, search, sortByPopularity } = useFilters();
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getPrompts();
            setPrompts(data);
        })();
    }, []);

    let filteredPrompts = prompts;

    if (category !== "all") {
        filteredPrompts = prompts.filter(el => el.category === category.name);
    } 

    if (search.trim()) {
        filteredPrompts = filteredPrompts.filter(el =>
            el.title.toLowerCase().includes(search.toLowerCase()) ||
            el.body.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sortByPopularity) {
        filteredPrompts = [...filteredPrompts].sort((a, b) => b.usageCount - a.usageCount);
    } else {
        filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return (
        <>
            <PromtsToolbar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrompts.map(el =>  
                    <Card 
                        key={ el.id } 
                        prompt={ el } 
                    />
                )}
            </div>
        </>
    );
}
