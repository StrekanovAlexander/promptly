import { Link } from "react-router-dom";
import { useCategories } from "@/context/GlobalContext.jsx";
import { useFilters } from "@/context/FiltersContext.jsx";
import { Icon2 } from "@/components/ui/index.jsx";

export default function SidebarGenerator() {
    const { categories } = useCategories();
    const { filterCategory } = useFilters();
    const menuRoot = {id: 0, name: "Генератор", icon: "Layers", slug: ""};

    return (
        <nav className="flex flex-col gap-6">
            {/* Заголовок блока */}
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                Опции выбора
            </h3>

            <ul className="flex flex-col gap-2">
                <li className="flex flex-col gap-1">
                    <Link
                        to={`/prompt-generator`}
                        className={`flex gap-3 items-center w-full text-left px-3 py-1 rounded-lg text-sm transition-all ${
                            filterCategory === "all"
                            ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                            : "text-neutral-300 hover:bg-neutral-800/50 hover:text-sky-300"
                        }`}
                    >   
                        <Icon2 icon={menuRoot.icon} size={18} className={"text-neutral-400"} />
                        <span className="text-sm font-medium">{menuRoot.name}</span>
                    </Link>
                    <ul className="flex flex-col gap-2 pl-3">
                        {categories.map((el) => (
                            <li key={el.id}>
                                <Link
                                    to={`/prompt-generator/${el.slug}`}
                                    className={`flex gap-3 items-center w-full text-left px-3 py-1 rounded-lg text-sm transition-all ${
                                    el.id === filterCategory
                                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                                        : "text-neutral-300 hover:bg-neutral-800/50 hover:text-sky-300"
                                    }`}
                                >
                                    <Icon2 icon={el.icon} size={18} className={"text-neutral-400"} />
                                    <span className="text-sm font-medium">{el.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>

            {/* <ul className="flex flex-col gap-2">
                {menu.map((platform) => (
                    <li key={platform.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-neutral-300 font-medium select-none">
                        <CustomIcon
                            icon={platform.icon}
                            size={18}
                            className="text-neutral-400"
                            title={platform.name}
                        />
                        <span>{platform.name}</span>
                    </div>

                    <ul className="flex flex-col gap-1 pl-6">
                        {platform.versions.map((version) => (
                            <li key={version.id}>
                                <button
                                    onClick={() => handleSelectVersion(version)}
                                    className={`w-full text-left px-3 py-1 rounded-lg text-sm transition-all ${
                                    version.id === platformVersion.id
                                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                                        : "text-neutral-300 hover:bg-neutral-800/50 hover:text-sky-300"
                                    }`}
                                >
                                    {version.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
                ))}
            </ul> */}
        </nav>
    );
}