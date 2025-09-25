import { useEffect, useState } from "react";
import { useFilters } from "../../../context/PostFiltersContext.jsx";
import { getPostCategories } from "../../../services/api.js";
import { sleep } from "../../../utils/times.js";
import Icon from "../../icons/Icon.jsx";
import Spinner from "../../icons/Spinner.jsx";

export default function PostSidebar() {
    const { postCategory, setPostCategory } = useFilters();
    const [postCategories, setPostCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await getPostCategories();
            setPostCategories(data);
            await sleep(500);
            setIsLoaded(true);
        })();
    }, []);

    return (
        <aside className="w-full md:w-64 self-start bg-white rounded-lg border shadow-sm p-4 md:sticky md:top-[85px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Категории
            </h2>
            <ul className="space-y-1">
                <li>
                    <button
                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition ${
                            postCategory === "all" ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100 hover:text-blue-600"
                        }`}
                        onClick={() => setPostCategory("all")}
                    >
                        <Icon icon="Layers" />Все
                    </button>
                </li>

                {!isLoaded && <Spinner />}        

                {isLoaded && postCategories.map((el) => (
                    <li key={el.id}>
                        <button
                            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition ${
                                postCategory.name === el.name ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100 hover:text-blue-600"
                            }`}
                             onClick={() => setPostCategory(el)}
                        >
                            <Icon icon={el.icon} />
                            {el.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
