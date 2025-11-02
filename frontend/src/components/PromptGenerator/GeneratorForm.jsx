import { useState, useEffect } from "react";
import { useApiStatus } from "@/context/ApiStatusContext.jsx";
import { getPlatformFieldsByCategory } from "@/services/api.js";
import GenericSubForm from "./GenericSubForm.jsx";

export default function GeneratorForm({ category }) {
    const [promptFields, setPromptFields] = useState([]);
    const [formData, setFormData] = useState({});
    const { setLoading, setError } = useApiStatus();

    const loadPromptFields = async () => {
        setLoading("prompt_fields", true);
        setError("prompt_fields", null);
        try {
            // Временно принудительно category = 1 (Контент)
            const data = await getPlatformFieldsByCategory(1);
            setPromptFields(data);
        } catch (err) {
            console.error(err);
            setError("prompt_fields", err.toString());
        } finally {
            setLoading("prompt_fields", false);
        }
    };

    useEffect(() => {
        loadPromptFields();
    }, []);

    const handleFormChange = (updatedData) => {
        setFormData(updatedData);
        // В будущем тут можно будет собирать итоговый промпт
        // console.log("Текущее состояние формы:", updatedData);
    };

    if (promptFields) {
        promptFields.map(el => console.log(el));
    }
    
    return (
        <div
            className="bg-neutral-900/60 border border-neutral-700 
            rounded-2xl p-10 backdrop-blur-sm shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        >
            <p className="text-neutral-300 mb-6 text-lg">
                Заполни поля, чтобы сгенерировать промпт для категории{" "}
                <strong className="text-sky-400">{category.name}</strong>.
            </p>

            {/* Подформа с динамическими полями */}
            {promptFields.length > 0 ? (
                <GenericSubForm
                    promptFields={promptFields}
                    onChange={handleFormChange}
                />
            ) : (
                <p className="text-neutral-500 italic">
                    Загрузка полей формы...
                </p>
            )}
        </div>
    );
}
