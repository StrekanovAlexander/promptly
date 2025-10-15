import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";

export default function PromptGeneratorPage() {
    const navigate = useNavigate();
    const { categorySlug } = useParams();
    const { filterCategory, setFilterCategory } = useFilters();
    const { categories } = useCategories();
    const [ category, setCategory ] = useState(null);

    useEffect(() => {
        if (categorySlug) {
            const foundCategory = categories.find((el) => el.slug === categorySlug);
            setCategory(foundCategory);
            if (foundCategory) {
                setFilterCategory(foundCategory.id);
            } else {
                setFilterCategory("all");
            }
        } else {
            setCategory(null);
            setFilterCategory("all");
        }
    }, [categorySlug, setFilterCategory]);

    return (
        <h1>Генератор промптов</h1>
    )
}