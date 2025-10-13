export default function Difficulty({ difficulty }) {
    return (
        <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium
                bg-neutral-700/40 text-neutral-300
                hover:bg-neutral-700/50 transition-colors`}
        >
            {difficulty === 'easy' ? 'Легкий' : difficulty === 'middle' ? 'Средний' : 'Сложный'}
        </span>
    );
}
