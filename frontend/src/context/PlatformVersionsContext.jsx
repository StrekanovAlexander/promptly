import { createContext, useContext, useState, useEffect } from "react";
import { useApiStatus } from "./ApiStatusContext.jsx";
import { getPlatformVersions } from "@/services/api.js";

const PlatformVersionsContext = createContext();

export default function PlatformVersionsProvider({ children }) {
    const { setLoading, setError } = useApiStatus();
    const [platformVersions, setPlatformVersions] = useState([]);
    const [platformVersion, setPlatformVersion] = useState({});

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
        if (platformVersions.length > 0) {
            setPlatformVersion(platformVersions[0]);
        }
    }, [platformVersions]);

    return (
        <PlatformVersionsContext.Provider value={{ 
            platformVersions, 
            platformVersion, 
            setPlatformVersion 
        }}>
            {children}
        </PlatformVersionsContext.Provider>
    );
}

export function usePlatformVersions() {
    return useContext(PlatformVersionsContext);
}