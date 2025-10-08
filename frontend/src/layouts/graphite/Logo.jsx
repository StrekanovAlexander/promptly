import { Aperture } from "lucide-react";

export default function Logo({ font = "Baloo 2" }) {
    const fontStyle = { fontFamily: `'${font}', sans-serif` };
    return (
        <div className="flex items-center gap-2 group">
            <Aperture className="w-7 h-7 text-white transition-colors duration-300 ease-out group-hover:text-sky-400" />
            <span
                className="text-2xl font-bold text-white transition-colors duration-300 ease-out group-hover:text-sky-400 group-hover:drop-shadow-md"
                style={fontStyle}
            >
                Promptly
            </span>
        </div>
    )
}