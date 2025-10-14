import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { getPrompts } from "@/services/api.js";
import { useSEO } from "@/hooks/useSEO.jsx";
import Card from "@/components/Prompts/Card.jsx";
import CreatePromptForm from "@/components/Prompts/CreatePromptForm.jsx";
import { Icon2, NeonButton, Spinner }  from "@/components/ui/index.jsx";

export default function PromptsPage() {
    const navigate = useNavigate();
    const { status, setLoading, setError } = useApiStatus();
    const { user } = useAuth();
    const [ prompts, setPrompts ] = useState([]);
    const { categories } = useCategories();
    const { categorySlug } = useParams();
    const { filterCategory, setFilterCategory, filterSearch, setFilterSearch, filterPlatforms, sorting, setSorting } = useFilters();
    const [ category, setCategory ] = useState(null);
    const [ isModalOpen, setIsModalOpen] = useState(false);

    const loadPrompts = async () => {
        setLoading("prompts", true);
        setError("prompts", null);
        try {
            const data = await getPrompts();
            setPrompts(data);
        } catch (err) {
            setError("prompts", err.toString());
        } finally {
            setLoading("prompts", false);
        }
    };

    useEffect(() => {
        loadPrompts();
    }, []); 

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

    let filteredPrompts = prompts;

    if (filterCategory !== "all") {
        filteredPrompts = prompts.filter(el => el.categoryId === filterCategory);
    } 

    if (filterSearch.trim()) {
        filteredPrompts = prompts.filter(el =>
            el.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
            el.body.toLowerCase().includes(filterSearch.toLowerCase()) ||
            el.response.toLowerCase().includes(filterSearch.toLowerCase())
        );
    }

    if (filterPlatforms.length > 0) {
        filteredPrompts = filteredPrompts.filter(el =>
            el.platforms.some(p => filterPlatforms.includes(p.id))
        );
    }

    if (sorting === "popular") {
        filteredPrompts = [...filteredPrompts].sort((a, b) => b.usageCount - a.usageCount);
    } else if (sorting === "newest") {
        filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sorting === "oldest") {
        filteredPrompts = [...filteredPrompts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
        filteredPrompts.sort((a, b) => a.title.localeCompare(b.title));
    }

    useSEO({
        title: category ? `${category.name} - Промпты` : "Библиотека промптов",
        description: category?.description || "Подборка промптов по разным направлениям",
        canonical: category
            ? `https://www.promptly.team/prompts/${category.slug}`
            : "https://www.promptly.team/prompts"
    });

    function handleModalOpen() {
        if (user) {
            setIsModalOpen(true)
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="w-full">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
                <Link
                    to="/"
                    className="hover:text-sky-400 transition-colors duration-200"
                >
                    Главная
                </Link>
                <span className="text-neutral-600">/</span>
                <Link
                    to="/prompts"
                    className="hover:text-sky-400 transition-colors duration-200"
                >
                    Промпты
                </Link>
                <span className="text-neutral-600">/</span>
                <span 
                    className="text-neutral-300 font-medium relative"
                    // className="text-sky-400 font-medium relative"
                    style={{
                        textShadow: '0 0 4px rgba(56,189,248,0.5), 0 0 10px rgba(56,189,248,0.3)'
                    }}
                >
                    {category ? category?.name : 'Все категории'}
                </span>
            </nav>

            {/* Заголовок страницы */}
            <section className="mt-6 mb-8">
                {/* Основной заголовок + кнопка */}
                <div className="flex items-center gap-4 mb-4 justify-between">
                    <div className="flex items-center gap-2">
                        {category && (
                            <Icon2
                                icon={category.icon}
                                size={22}
                                className="text-sky-400 shrink-0"
                            />
                        )}
                        <h1 className="text-2xl md:text-3xl font-bold font-opensans text-neutral-300">
                            {category ? `Промпты категории «${category.name}»` : "Библиотека промптов"}
                        </h1>
                    </div>

                    {/* Кнопка добавления промпта */}
                    <NeonButton 
                        onClick={handleModalOpen}
                        pulse
                    >
                        Создать промпт
                    </NeonButton>
                </div>

                {/* Подзаголовок / описание */}
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                    {category
                    ? category.description ||
                        "Промпты, связанные с творческой деятельностью: логотипы, макеты, UI/UX"
                    : "Фильтруй по категориям и платформам - и находи нужные идеи за секунды."}
                </p>
            </section>

            {/* Поиск */}
            <section className="flex justify-center mt-10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 w-full max-w-3xl">
                    {/* Поле поиска */}
                    <div className="relative w-full">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 z-10"
                            size={22}
                        />
                        <input
                            type="text"
                            value={filterSearch}
                            onChange={(ev) => setFilterSearch(ev.target.value)}
                            placeholder="Поиск промпта..."
                            className="w-full rounded-xl bg-neutral-900/70 pl-12 pr-4 py-3 text-base 
                            border border-sky-500/40 text-neutral-100 placeholder-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-sky-400 
                            shadow-[0_0_10px_rgba(56,189,248,0.25)]
                            hover:shadow-[0_0_14px_rgba(56,189,248,0.35)]
                            transition-all duration-300 peer backdrop-blur-sm"
                        />
                    </div>

                    {/* Селектор сортировки */}
                    <select
                        value={sorting}
                        onChange={(ev) => setSorting(ev.target.value)}
                        className="rounded-xl bg-neutral-900/70 border border-neutral-700 text-neutral-200 text-sm 
                            px-4 h-12 focus:outline-none focus:ring-2 focus:ring-sky-500 
                            hover:border-sky-400 transition cursor-pointer appearance-none
                            shadow-[0_0_8px_rgba(56,189,248,0.15)] backdrop-blur-sm"
                    >
                        <option value="popular">По популярности</option>
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                        <option value="title">По наименованию</option>
                    </select>
                </div>
            </section>

            {/* Контент */}
            <section className="mt-10 flex-1">
                {status.prompts?.isLoading && <Spinner />}

                {!status.prompts?.isLoading && (
                    <div className="w-full pr-6">
                        <div
                            className="grid gap-10"
                            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}
                        >
                            {filteredPrompts.map((el) => (
                                <Card key={el.id} prompt={el} />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            { isModalOpen && 
                <CreatePromptForm
                    onClose={() => setIsModalOpen(false)}
                    onCreated={loadPrompts}
                /> 
            }  
        </div>
    );
}
