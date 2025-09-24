import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUserData } from "../../services/api.js";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState(null);

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
            }
        };

        fetchUser();
    }, [user?.userId]);

    if (!user) return <p>Загрузка данных пользователя...</p>;
    if (!userData) return <p>Загрузка профиля...</p>;
    
    return (
        <div>
            <p>Email: {user.email}</p>
            <p>Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
}
