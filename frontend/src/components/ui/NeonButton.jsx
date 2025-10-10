export default function NeonButton({ onClick, children, className, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                inline-block px-6 py-3 rounded-xl border border-sky-500/40 text-sky-300 font-medium
                bg-gradient-to-b from-neutral-800/60 to-neutral-900/60
                hover:from-sky-500/20 hover:to-sky-600/10
                hover:border-sky-400 hover:text-sky-200
                drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]
                hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]
                transition-all duration-500 ease-out backdrop-blur-sm
                ${className || ""}
            `}
        >
            {children}
        </button>
    );
}