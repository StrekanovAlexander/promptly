import { createPortal } from "react-dom";

export default function GeneralModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-neutral-800/90 rounded-2xl w-[90vw] max-w-[1200px] h-[90vh] flex flex-col relative p-6 pt-10">
                {/* Кнопка закрытия */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neutral-200 hover:text-white"
                >
                ✖
                </button>
                {/* Содержимое модального окна */}
                {children}
            </div>
        </div>, document.getElementById("modal-root")
    );
}
