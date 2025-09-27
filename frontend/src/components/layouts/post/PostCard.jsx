import { Calendar, User } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <article className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
        {post.title}
      </h2>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <User size={14} />
          {post.author || "Unknown author"}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3">
        {post.body}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags?.split(',').map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
    )
} 