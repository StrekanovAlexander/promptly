import { Aperture } from "lucide-react";

export default function Logo({ font = "Baloo 2" }) {
    const fontStyle = { fontFamily: `'${font}', sans-serif` };
    return (
        <div className="flex items-center gap-2">
            <Aperture className="w-7 h-7 text-blue-600" />
                <span
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    style={fontStyle}
                >
                Promptly
            </span>
        </div>
    );
}