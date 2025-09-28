import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { getCategories, createPrompt } from "../../services/api.js";

export default function ModalCreatePrompt({ isOpen, onClose, onCreated }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoaded(false);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };
  
    fetchCategories();
  }, []);
  
  if (error) return <p>Error: {error}</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoaded(false);
    try {
      const prompt = { userId: user.id, title, body, tags, category, isPublic };
      await createPrompt(prompt);
      toast.success(`Prompt "${title}" was created`);
      onCreated();
      onClose();
    } catch (err) {
      toast.error("Error during prompt creating");
    } finally {
      setIsLoaded(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] pointer-events-auto">
      <div className="w-[600px] bg-white p-6 border rounded-md shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Create Prompt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
          />
        </div>
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. design, ideas"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={isPublic === true}
                onChange={() => setIsPublic(true)}
                className="text-blue-600 focus:ring-blue-500"
              />Public
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={isPublic === false}
                onChange={() => setIsPublic(false)}
                className="text-blue-600 focus:ring-blue-500"
              />Private
            </label>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
        </form>
      </div>
    </div>
  )
} 