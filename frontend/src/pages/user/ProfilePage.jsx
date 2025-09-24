import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUserData } from "../../services/api.js";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!user?.userId) return;

        const fetchUser = async () => {
            try {
                const data = await getUserData(user.userId);
                setUserData(data);
                const { prompts, ...newFields } = data;
                const hasExtraFields = Object.keys(newFields).every(key => key in user);

                if (!hasExtraFields) {
                    setUser(prev => ({ ...prev, ...newFields }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchUser();
    }, [user?.userId]);

    if (!user) return <p>Загрузка данных пользователя...</p>;
    if (!userData) return <p>Загрузка профиля...</p>;
    
    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">Мои промпты</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {userData.prompts.map(prompt => (
                    <div key={prompt.id} className="border rounded-lg p-4 shadow-sm">
                        <h2 className="font-semibold">{prompt.title}</h2>
                        <p className="text-sm text-gray-600">{prompt.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
