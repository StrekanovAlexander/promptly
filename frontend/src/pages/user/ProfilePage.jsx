import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../services/api.js";
import { parseJwt } from "../../utils/tokens.js";

export default function ProfilePage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return <p>...Spinner...</p>;

    const [userData, setUserData] = useState({});
    const decoded = parseJwt(localStorage.getItem("token"));
    const { userId } = decoded;

    useEffect(() => {
        (async () => {
            const data = await getUserData(userId);
            setUserData(data);
        })();
    }, []);

    return (
        <div>
            <h1>Hello, {user.name}!</h1>
            <p>{user.email}</p>
            {!userData 
                ? <p>Downloading...</p> 
                : userData.prompts?.length 
                    ? userData.prompts.map(el => (
                        <div key={el.id}>{el.title}</div>
                    )) : <p>No data</p>
            }
        </div>
    );
}