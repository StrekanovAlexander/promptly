export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t py-6">
            <div className="max-w-5xl mx-auto px-4 text-sm text-center text-gray-600 flex items-center justify-between">
                <span className="text-gray-500">
                    &copy; {new Date().getFullYear()} prompty.team
                </span>
                <div className="flex justify-center gap-3">
                    <a href="https://github.com/StrekanovAlexander" target="_blank" className="text-gray-400">
                        <img src="/icons/github-mark.svg" alt="GitHub" className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/oleksandr-strekanov-94928a387" target="_blank" className="text-gray-400">
                        <img src="/icons/InBug-Black.png" alt="LinkedIn" className="w-5 h-5" />
                    </a>    
                </div>
            </div>
        </footer>
    );
}