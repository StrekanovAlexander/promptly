import { Calendar, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../services/api.js";
import Spinner from "../../components/icons/Spinner.jsx";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
          const data = await getPost(id);
          setPost(data);
          setIsLoaded(true);
        })();
    }, []);

    if (!post) return <p>Пост не найден</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {!isLoaded && <Spinner />} 
            {isLoaded && 
            <>
                <div className="mb-4">
                    <Link to="/posts" className="text-blue-600 hover:underline text-sm">
                        Все публикации
                    </Link>
                </div>
            
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.author || "Неизвестный автор"}
                    </span>
                
                    {post.category && (
                        <span className="flex items-center gap-1">
                            <Tag size={16} />
                            {post.category}
                        </span>
                    )}
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-6 text-gray-700 leading-relaxed">
                    {post.body}
                </div>
            
                {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.split(',').map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </>}
        </div>
    )
}