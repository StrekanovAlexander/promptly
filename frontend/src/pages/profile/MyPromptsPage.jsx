import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getPromptsByUser } from "../../services/api.js";
import ProfilePromtCard from "../../components/layouts/profile/ProfilePromptCard.jsx";
import Spinner from "../../components/icons/Spinner.jsx";

export default function MyPromptsPage() {
    const { user } = useAuth();
    const [prompts, setPrompts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id || !user?.token) return;

        const fetchPrompts = async () => {
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

        fetchPrompts();
    }, [user?.id, user?.token]);

    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Prompts</h1>
            {!isLoaded && <Spinner /> }
            {isLoaded &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {prompts.map(prompt => (
                        <ProfilePromtCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            }
        </div>
    )
}
