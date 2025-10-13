import { Link } from "react-router-dom";

export default function NeonLink({ to, children, className, pulse = false }) {
    return (
        <Link
            to={to}
            className={`
                inline-block px-6 py-3 rounded-xl border border-sky-500/40 text-neutral-100 font-medium
                bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                hover:from-sky-500/20 hover:to-sky-600/10
                hover:border-sky-400 hover:text-neutral-50
                drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                transition-all duration-500 ease-out backdrop-blur-sm
                ${pulse ? "animate-pulseGlow" : ""}
                ${className || ""}
            `}
        >
            {children}
        </Link>
    );
};