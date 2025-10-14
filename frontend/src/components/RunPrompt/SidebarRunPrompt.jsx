import { useState, useEffect } from "react";
import { useCategories } from "@/context/GlobalContext.jsx";
import { usePlatformVersions } from "@/context/PlatformVersionsContext.jsx";
import CustomIcon from "../ui/custom-icons/CustomIcon.jsx";

export default function SidebarRunPrompt() {
    const { platformVersions, platformVersion, setPlatformVersion } = usePlatformVersions();
    const { platforms } = useCategories();
    const [menu, setMenu] = useState([]);
    
    useEffect(() => {
        if (platformVersions.length && platforms.length) {
            const menuArray = platforms.map(el => {
                return {...el, versions: platformVersions.filter(el2 => el.icon === el2.platform )}
            });
            setMenu(menuArray);
        }
    }, [platformVersions, platforms]);
    
    function handleSelectVersion(version) {
        if (version.id !== platformVersion.id) {
            setPlatformVersion(version);
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
            </ul>
        </nav>
    ) 
}