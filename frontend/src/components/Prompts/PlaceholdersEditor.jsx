import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

export default function PlaceholdersEditor({ initialPlaceholders = [], onChange }) {
    const [placeholders, setPlaceholders] = useState(() => {
        if (Array.isArray(initialPlaceholders)) return initialPlaceholders;
        try {
            return JSON.parse(initialPlaceholders || "[]");
        } catch {
            return [];
        }
    });
    
    const jsonValue = JSON.stringify(placeholders, null, 2);

    useEffect(() => {
        if (onChange) onChange(placeholders);
    }, [placeholders]);

    const handleAdd = () => {
        setPlaceholders([...placeholders, { name: "", description: "" }]);
    };

    const handleRemove = (index) => {
        const newPlaceholders = placeholders.filter((_, i) => i !== index);
        setPlaceholders(newPlaceholders);
    };

    const handleChange = (index, field, value) => {
        const newPlaceholders = [...placeholders];
        newPlaceholders[index][field] = value;
        setPlaceholders(newPlaceholders);
        if (onChange) onChange(newPlaceholders);
    };

    return (
        <div>
            {placeholders.map((ph, index) => (
                <div key={index} style={{ 
                        display: "flex", 
                        marginBottom: "8px", 
                        gap: "8px",
                        padding: "2px 0", 
                        justifyContent: "space-between",
                        borderBottom: "1px solid gray",
                    }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={ph.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        className="w-full"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={ph.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        className="w-full"
                    />
                    <button 
                        type="button" 
                        onClick={() => handleRemove(index)}
                        className="flex items-center my-1 px-1 py-1 rounded-2xl bg-gray-500 hover:bg-gray-700 text-sm text-white"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            ))}
            <div className="flex justify-end">
                <button 
                    type="button" 
                    onClick={handleAdd} 
                    className="flex items-center gap-2 my-1 px-1 py-1 rounded-2xl bg-[#4F8EF7] hover:bg-[#3A6DD1] text-sm text-white">
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div>
                <textarea
                    id="placeholders"
                    name="placeholders"
                    rows="8"
                    cols="50"
                    readOnly
                    value={jsonValue}
                    style={{
                        width: "100%",
                        fontFamily: "monospace",
                        background: "#f9f9f9",
                        color: "#333",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "8px",
                    }}
                />
            </div>
        </div>
    );
}