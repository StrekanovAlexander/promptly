export default function Spinner() {
    return (
        <div className="flex items-center justify-center p-4">
            <div 
                className="w-6 h-6 border-[3px] border-neutral-600 border-t-sky-400 rounded-full 
                    animate-spin [animation-duration:0.8s] shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            </div>
        </div>
    );
}