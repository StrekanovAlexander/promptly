import { toast } from "react-hot-toast";
import { Mail, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../../components/icons/Spinner.jsx";


export default function AccountPage() {
    const { user } = useAuth();

    function handleEdit() {
        toast.error("This functionality is still under development.");
    }

    if (!user) {
        return (
            <div className="my-8">
                <Spinner />;
            </div>
        )
    }    
    
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Account</h1>
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <span className="text-gray-800">{user.email}</span>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleEdit} 
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                        <Edit3 size={18} />
                        Edit data
                    </button>
                </div>
            </div>
        </div>
    )
}


/*
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
    */
