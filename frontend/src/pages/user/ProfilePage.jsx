import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUserData } from "../../services/api.js";
import FormCreatePrompt from "../../components/forms/FormCreatePrompt.jsx";
import ProfileCard from "../../components/cards/ProfileCard.jsx";
import Spinner from "../../components/icons/Spinner.jsx";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!user?.userId) return;
        fetchUserData(user.userId);
    }, [user?.userId]);

    async function fetchUserData() {
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

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold mb-4">Мои промпты</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-sm text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
                >
                    Создать промпт
                </button>
                { isModalOpen && 
                    <FormCreatePrompt
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreated={fetchUserData}
                    /> 
                }
            </div>
            {!isLoaded 
                ? <Spinner />
                : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {userData.prompts.map(el => 
                        <ProfileCard 
                            key={el.id} 
                            prompt={el}
                            fetchUserData={fetchUserData} 
                        />
                    )}
                </div>
            }
        </div>
    );
}
