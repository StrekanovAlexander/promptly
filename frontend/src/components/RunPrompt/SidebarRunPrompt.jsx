import { useState, useEffect } from "react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { useCategories } from "@/context/GlobalContext.jsx";
import { usePages } from "@/context/PagesContext";
import { getPlatformVersions } from "@/services/api.js";
import CustomIcon from "../ui/custom-icons/CustomIcon.jsx";

export default function SidebarRunPrompt() {
    const { setPageTitle } = usePages();
    const { platforms } = useCategories();
    const { setLoading, setError } = useApiStatus();
    const [platformVersions, setPlatformVersions] = useState([]); 
    const [menu, setMenu] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState(1);
    
    useEffect(() => {
        const loadPlatformVersions = async () => {
            setLoading("platform_versions", true);
            setError("platform_versions", null);
            try {
                const data = await getPlatformVersions();
                setPlatformVersions(data);
            } catch (err) {
                setError("platform_versions", err.toString());
            } finally {
                setLoading("platform_versions", false);
            }
        };
    
        loadPlatformVersions();
    }, []); 

    useEffect(() => {
        if (menu.length && selectedVersion) {
            const selectedPlatform = menu
                .flatMap(platform => platform.versions.map(v => ({ ...v, parentName: platform.name })))
                .find(v => v.id === selectedVersion);

            const pageTitle = selectedPlatform
                ? `Запуск промпта с ${selectedPlatform.parentName} версии ${selectedPlatform.name}`
                : "Запуск промпта";    

            setPageTitle(pageTitle);
        }
    }, [menu, selectedVersion, setPageTitle]);

    useEffect(() => {
        if (platformVersions.length && platforms.length) {
            const menuArray = platforms.map(el => {
                return {...el, versions: platformVersions.filter(el2 => el.icon === el2.platform )}
            });
            setMenu(menuArray);
        }
    }, [platformVersions, platforms]);
    
    function handleSelectVersion(id) {
        if (id !== selectedVersion) {
            setSelectedVersion(id);
        }
    }

    if (!menu) return null;

    return (
        <nav className="flex flex-col gap-6">
            {/* Заголовок блока */}
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider px-2">
                Платформы
            </h3>

            <ul className="flex flex-col gap-2">
                {menu.map((platform) => (
                    <li key={platform.id} className="flex flex-col gap-1">
                    {/* Заголовок платформы */}
                    <div className="flex items-center gap-3 px-3 py-2 text-neutral-300 font-medium select-none">
                        <CustomIcon
                            icon={platform.icon}
                            size={18}
                            className="text-neutral-400"
                            title={platform.name}
                        />
                        <span>{platform.name}</span>
                    </div>

                    {/* Версии платформы */}
                    <ul className="flex flex-col gap-1 pl-6">
                        {platform.versions.map((version) => (
                        <li key={version.id}>
                            <button
                                onClick={() => handleSelectVersion(version.id)}
                                className={`w-full text-left px-3 py-1 rounded-lg text-sm transition-all ${
                                version.id === selectedVersion
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
            </ul>
        </nav>
    ) 
}