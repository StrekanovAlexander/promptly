export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t">
            <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-center text-gray-600">
                &copy; {new Date().getFullYear()} AI Prompt Library
            </div>
        </footer>
    );
}