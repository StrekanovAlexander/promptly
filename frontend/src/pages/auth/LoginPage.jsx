import { toast } from "react-hot-toast";
import GoogleIcon from "@/components/ui/custom-icons/GoogleIcon.jsx";
import GitHubIcon from "@/components/ui/custom-icons/GitHubIcon.jsx";
import FacebookIcon from "@/components/ui/custom-icons/FacebookIcon.jsx";

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
      const accessType = "offline";
      const prompt = "consent";
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;
      window.location.href = url;
    } else if (provider === "facebook") {
      toast.error("This functionality is still under development, but you can log in with Google or GitHub.");
    } else {
      return;
    }
  };
    
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div
        className="bg-neutral-800/80 border border-neutral-700/60 
          rounded-2xl p-10 w-full max-w-md shadow-[0_0_30px_rgba(56,189,248,0.2)]
          backdrop-blur-sm md:mt-24"
      >
        <h2 className="text-2xl font-semibold text-center text-neutral-200 mb-2">
          Вход в систему
        </h2>
        <p className="text-center text-neutral-400 text-sm mb-8">
          Выберите способ авторизации
        </p>
        {/* Кнопки провайдеров */}
        <div className="flex flex-col gap-4">
          {/* Google */}
          <button
            onClick={() => handleLogin("google")}
            className="flex items-center justify-center gap-3 
              bg-neutral-700/50 hover:bg-neutral-700 
              border border-neutral-600/50 
              rounded-xl py-3 transition-all duration-200
              text-neutral-200 hover:text-white"
          >
            <GoogleIcon size={24} className="drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
            Войти через Google
          </button>

          {/* GitHub */}
          <button
            onClick={() => handleLogin("github")}
            className="flex items-center justify-center gap-3 
              bg-neutral-700/50 hover:bg-neutral-700 
              border border-neutral-600/50 
              rounded-xl py-3 transition-all duration-200
              text-neutral-200 hover:text-white"
          >
            <GitHubIcon size={24} className="drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
            Войти через GitHub
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleLogin("facebook")}
            className="flex items-center justify-center gap-3 
              bg-neutral-700/50 hover:bg-neutral-700 
              border border-neutral-600/50 
              rounded-xl py-3 transition-all duration-200
              text-neutral-200 hover:text-white"
          >
            <FacebookIcon size={24} className="drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
            Войти через Facebook
          </button>
        </div>

        <div className="text-center mt-8 text-sm text-neutral-500">
          Нажимая “Войти”, вы соглашаетесь с{" "}
          <br />
          <span className="text-sky-400 hover:underline cursor-pointer">
            условиями использования
          </span>
        </div>
      </div>
    </div>
  )
}
