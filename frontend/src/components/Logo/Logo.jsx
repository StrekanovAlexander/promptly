import { Aperture } from "lucide-react";

export default function Logo({ font = "Baloo 2" }) {
    const fontStyle = { fontFamily: `'${font}', sans-serif` };
    return (
        <div className="flex items-center gap-2">
            <Aperture className="w-7 h-7 text-[#4F8EF7] drop-shadow-sm" />
            <span className="text-2xl font-bold text-[#4F8EF7] drop-shadow-sm" style={fontStyle}>
                Promptly
            </span>
        </div>
    )
}