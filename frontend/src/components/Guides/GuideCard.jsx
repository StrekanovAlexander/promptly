export default function GuideCard({ title, description, author, date }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col justify-between">
            {/* title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            {/* short description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
            {/* footer */}
            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                <span>{author}</span>
                <span>{date}</span>
            </div>
        </div>
    );
}
