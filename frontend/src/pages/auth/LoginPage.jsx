import Logo from "../../components/layouts/common/Logo.jsx";

export default function LoginPage() {
    const handleLogin = (provider) => {
        if (provider === "github") {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
            const redirectUri = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/github/callback`);
            const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
            window.location.href = url;
        } else if (provider === "google") {
            console.log(provider);
        } else if (provider === "facebook") {
            console.log(provider);
        } else {
            console.log("Not such provider")
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