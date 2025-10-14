import { createPortal } from "react-dom";

export default function GeneralModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-neutral-800/80 backdrop-blur-md">
            <div className="bg-neutral-900/95 rounded-2xl shadow-[0_0_40px_rgba(56,189,248,0.35)] w-full max-w-lg p-6 relative animate-fade-in">
                <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                ✖
                </button>
                {children}
            </div>
        </div>, document.getElementById("modal-root")
    );
}