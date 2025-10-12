export default function Difficulty({ difficulty }) {
    return (
        <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
                difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                difficulty === 'middle' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
            }`}
        >
            { difficulty === 'easy' ? 'Легкий' :
             difficulty === 'middle' ? 'Средний' : 'Сложный' }
        </div>
    )
}
