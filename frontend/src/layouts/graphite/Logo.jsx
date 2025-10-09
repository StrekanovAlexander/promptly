import { Aperture } from "lucide-react";

export default function Logo({ font = "Baloo 2" }) {
    const fontStyle = { fontFamily: `'${font}', sans-serif` };
    return (
        <div className="flex items-center gap-2 group">
            <Aperture 
                className="w-7 h-7 text-white transition-all duration-500 ease-out
                    drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] 
                    group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]
                    group-hover:scale-105" 
            />
            <span
                className="text-2xl font-bold text-white transition-all duration-500 ease-out
                    drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]
                    group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]
                    group-hover:scale-[1.02]"
                style={fontStyle}
            >
                Promptly
            </span>
        </div>
    )
}