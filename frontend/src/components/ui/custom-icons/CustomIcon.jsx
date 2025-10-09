import icons from "./index.js";

export default function CustomIcon({ icon, size = 16, className = "", title }) {
    if (!icon) return null;
    
    const key = String(icon).toLowerCase();
    const IconComp = icons[key];

    if (!IconComp) return null;

    return <IconComp size={size} className={className} title={title} />;
}
