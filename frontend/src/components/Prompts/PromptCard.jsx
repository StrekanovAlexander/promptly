import { FileText, Code, Megaphone, Palette, GraduationCap, Briefcase, Info, Sparkles, Calendar } from "lucide-react";

const categoryConfig = {
  "Контент": { icon: FileText, color: "bg-blue-100 text-blue-700" },
  "Программирование": { icon: Code, color: "bg-indigo-100 text-indigo-700" },
  "Маркетинг": { icon: Megaphone, color: "bg-yellow-100 text-yellow-700" },
  "Дизайн": { icon: Palette, color: "bg-pink-100 text-pink-700" },
  "Образование": { icon: GraduationCap, color: "bg-green-100 text-green-700" },
  "Бизнес": { icon: Briefcase, color: "bg-teal-100 text-teal-700" },
  "Информационные": { icon: Info, color: "bg-gray-100 text-gray-700" },
  "Креатив": { icon: Sparkles, color: "bg-purple-100 text-purple-700" },
  "Организация": { icon: Calendar, color: "bg-orange-100 text-orange-700" }
};

//import { categoryConfig } from "@/config/categoryConfig.js";

export default function PromptCard({ prompt }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            {prompt.category && (() => {
                const cfg = categoryConfig[prompt.category] || { color: "bg-gray-100 text-gray-700" };
                const Icon = categoryConfig[prompt.category]?.icon;
                return (
                    <span className={`inline-flex items-center gap-1 mb-2 px-3 py-1 text-xs font-medium rounded-full ${cfg.color}`}>
                        {Icon && <Icon className="w-3 h-3" />}
                        {prompt.category}
                    </span>
                );
            })()}
            {/* title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{prompt.title}</h3>
            {/* short body */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{prompt.body}</p>
            {/* tags */}
            <div className="flex flex-wrap gap-2 mb-3">
                {prompt.tags.slice(0, 3).map((el, idx) => (
                    <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                        #{el}
                    </span>
                ))}
            </div>
            {/* footer */}
            <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Автор: {prompt.author}</span>
                <span>Использований: {prompt.usageCount}</span>
            </div>
        </div>
    );
}
