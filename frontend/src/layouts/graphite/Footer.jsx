export default function Footer() {
    return (
        <footer className="w-full bg-neutral-900/80 border-t border-neutral-700 backdrop-blur-md mt-auto relative z-10">
            <div className="container mx-auto px-6 py-6 text-sm text-neutral-500 flex justify-between items-center">
                <div >
                    <a href="https://lottometrics.app" target="_blank" rel="noopener noreferrer">
                        <strong>LottoMetrics</strong><br/>
                        Честная аналитика лотерейных результатов<br/>
                        <span>Попробуйте бесплатно</span>
                    </a>
                </div>
                <div>
                    © 2025 Promptly. Все права защищены.
                </div>
            </div>
        </footer>
    );
}