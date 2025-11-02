import { useState, useEffect } from "react";

export default function GenericSubForm({ promptFields = [], onChange }) {
    const [formValues, setFormValues] = useState({});

    // Инициализация значений при загрузке promptFields
    useEffect(() => {
    const initialValues = {};
    promptFields.forEach((field) => {
        const fieldKey = field.key;

        if (field.type === "checkbox") {
            initialValues[fieldKey] = !!field.defaultValue;
        } else if (field.type === "select") {
            // Если defaultValue пустой, берем первый вариант из options
            initialValues[fieldKey] = field.defaultValue ?? field.options?.[0]?.value ?? "";
        } else {
            initialValues[fieldKey] = field.defaultValue ?? "";
        }
    });
    setFormValues(initialValues);
    onChange?.(initialValues);
}, [promptFields]);

    const handleChange = (key, value) => {
        const updated = { ...formValues, [key]: value };
        setFormValues(updated);
        onChange?.(updated);
    };

    if (!promptFields.length)
        return <p className="text-neutral-500 italic">Нет полей для отображения</p>;

    return (
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptFields.map((field) => (
                <div key={field.key} className="flex flex-col">
                    {/* Label */}
                    {field.type !== "checkbox" && (
                        <label
                            htmlFor={field.key}
                            className="text-neutral-400 text-sm mb-2"
                        >
                            {field.label}
                        </label>
                    )}

                    {/* Textarea */}
                    {field.type === "textarea" && (
                        <textarea
                            id={field.key}
                            value={formValues[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder || ""}
                            className="
                                w-full min-h-[120px] px-4 py-2 rounded-xl
                                bg-neutral-700/90 text-neutral-100
                                border border-cyan-500/30
                                focus:outline-none focus:ring-2 focus:ring-cyan-400/40
                                text-base resize-none
                            "
                        />
                    )}

                    {/* Select */}
                    {field.type === "select" && (
                        <select
                            id={field.key}
                            value={formValues[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="
                                w-full px-4 py-2 rounded-xl
                                bg-neutral-700/90 text-neutral-100
                                border border-cyan-500/30
                                focus:outline-none focus:ring-2 focus:ring-cyan-400/40
                                text-base appearance-none
                            "
                        >
                            <option value="">Выберите...</option>
                            {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Checkbox */}
                    {field.type === "checkbox" && (
                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={!!formValues[field.key]}
                                onChange={(e) => handleChange(field.key, e.target.checked)}
                                className="accent-cyan-500 w-5 h-5"
                            />
                            <span className="text-neutral-300">{field.label}</span>
                        </label>
                    )}

                    {/* Default input */}
                    {!field.type || (field.type !== "textarea" && field.type !== "select" && field.type !== "checkbox") && (
                        <input
                            id={field.key}
                            type={field.type || "text"}
                            value={formValues[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder || ""}
                            className="
                                w-full px-4 py-2 rounded-xl
                                bg-neutral-700/90 text-neutral-100
                                border border-cyan-500/30
                                focus:outline-none focus:ring-2 focus:ring-cyan-400/40
                                text-base
                            "
                        />
                    )}
                </div>
            ))}
        </form>
    );
}
