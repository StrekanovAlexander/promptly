export default function Difficulty({ difficulty }) {
    const colors = {
        easy: 'text-green-300/80',
        middle: 'text-amber-300/80',
        hard: 'text-red-300/80'
    };

    return (
        <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors ${colors[difficulty]}`}
        >
            {difficulty === 'easy' ? 'Легкий' :
             difficulty === 'middle' ? 'Средний' : 'Сложный'}
        </span>
    );
}
