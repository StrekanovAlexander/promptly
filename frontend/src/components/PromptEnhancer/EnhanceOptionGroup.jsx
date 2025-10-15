import { useState } from "react";

const LABELS_RU = {
    short: "Короткий",
    medium: "Средний",
    long: "Длинный",
    neutral: "Нейтральный",
    friendly: "Дружелюбный",
    creative: "Креативный",
    light: "Слабый",
    strong: "Сильный",
};

export default function EncanceOptionGroup({ title, keyName, values = [], onChange }) {
    const [selected, setSelected] = useState(values[0] || "");

    const handleClick = (value) => {
        setSelected(value);
        if (onChange && keyName) {
        onChange({ [keyName]: value }); // передаем наружу объект вида { keyName: value }
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 p-2 border border-neutral-600/50 rounded-xl bg-neutral-850/60 backdrop-blur-sm">
            {/* Заголовок с приглушённым цветом */}
            <h3 className="text-sm font-semibold text-neutral-400 text-center">{title}</h3>

            {/* Тонкая полоска-разделитель */}
            <div className="w-full h-px bg-neutral-600/40 mb-2"></div>

            <div className="flex gap-2">
                {values.map((value) => (
                <button
                    key={value}
                    onClick={() => handleClick(value)}
                    className={`
                    px-3 py-1 rounded-lg text-sm font-medium
                    transition-all duration-300
                    ${
                        selected === value
                        ? "bg-cyan-400/25 text-neutral-100 shadow-[0_0_6px_rgba(56,189,248,0.3)]"
                        : "bg-neutral-700/50 text-neutral-200 hover:bg-neutral-600/50"
                    }
                    `}
                >
                    {LABELS_RU[value] || value}
                </button>
                ))}
            </div>
        </div>
    );
}
