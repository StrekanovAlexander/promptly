import { toast } from "react-hot-toast";
import Logo from "../../components/layouts/common/Logo.jsx";

export default function LoginPage() {
    function handleLogin(provider) {
        if (provider === "github") {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
            const redirectUri = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/github/callback`);
            const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
            window.location.href = url;
        } else if (provider === "google") {
            const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
            const redirectUri = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/google/callback`);
            const scope = encodeURIComponent("openid email profile");
            const responseType = "code";
            const accessType = "offline"; // если хочешь refresh_token
            const prompt = "consent";     // чтобы Google всегда показывал выбор аккаунта
            const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;
            window.location.href = url;
            //toast.error("This functionality is still under development, but you can log in with GitHub.");
        } else if (provider === "facebook") {
            toast.error("This functionality is still under development, but you can log in with GitHub.");
        } else {
            return;
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8 text-center">
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>
                
                <p className="text-gray-500 mb-6 text-sm">Sign in with</p>

                <div className="flex justify-center gap-4">
                    
                    <button
                        onClick={() => handleLogin("google")}
                        className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        title="Google"
                    >
                        <img src="/icons/google.svg" alt="Google" className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => handleLogin("github")}
                        className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        title="GitHub"
                    >
                        <img src="/icons/github-mark.svg" alt="GitHub" className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => handleLogin("facebook")}
                        className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        title="Facebook"
                    >
                        <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-6">
                    By logging in, you agree to the Terms of Use
                </p>
            </div>
        </div>
    )
}