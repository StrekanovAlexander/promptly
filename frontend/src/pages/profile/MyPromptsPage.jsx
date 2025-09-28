import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getPromptsByUser } from "../../services/api.js";
import ProfilePromtCard from "../../components/layouts/profile/ProfilePromptCard.jsx";
import Spinner from "../../components/icons/Spinner.jsx";
import ModalCreatePrompt from "../../components/modals/ModalCreatePrompt.jsx";

export default function MyPromptsPage() {
    const { user } = useAuth();
    const [prompts, setPrompts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);

    async function fetchPrompts() {
        try {
            setIsLoaded(false);
            const data = await getPromptsByUser(user.id, user.token);
            setPrompts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        if (!user?.id || !user?.token) return;
        fetchPrompts();
    }, [user?.id, user?.token]);

    if (error) return <p>Error: {error}</p>;
    
    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Prompts</h1>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="border rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="">Все категории</option>
                            <option value="content">Контент</option>
                            <option value="productivity">Продуктивность</option>
                            <option value="tools">Инструменты</option>
                        </select>
                        <select className="border rounded-lg px-3 py-2 text-sm bg-white">
                            <option value="newest">Сначала новые</option>
                            <option value="oldest">Сначала старые</option>
                            <option value="title">По названию</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                        <Plus size={16} />Add prompt
                    </button>
                </div>
                {!isLoaded && <Spinner /> }
                {isLoaded &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {prompts.map(prompt => (
                            <ProfilePromtCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                }
            </div>
            { isCreateModalOpen && 
                <ModalCreatePrompt
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreated={fetchPrompts}
                /> 
            }  
        </>
    )
}
