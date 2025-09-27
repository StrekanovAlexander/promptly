import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFilters } from "../../context/FiltersContext.jsx";
import { getPosts } from "../../services/api.js";
import Spinner from "../../components/icons/Spinner.jsx";
import PostCard from "../../components/layouts/post/PostCard.jsx";
import PostToolBar from "../../components/layouts/post/PostToolBar.jsx";

export default function PostsPage() {
  const { postCategory, postSearch, postSorting } = useFilters();
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data);
      setIsLoaded(true);
    })();
  }, []);

  let filteredPosts = posts;

  if (postCategory !== "all") {
    filteredPosts = posts.filter(el => el.postCategoryId === postCategory.id);
  } 

  if (postSearch.trim()) {
    filteredPosts = filteredPosts.filter(el =>
      el.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      el.body.toLowerCase().includes(postSearch.toLowerCase())
    );
  }

  if (postSorting === "newest") {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (postSorting === "oldest") {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else if (postSorting === "up") {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (postSorting === "down") {
    filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Публикации</h1>
      <PostToolBar />
     
      {!isLoaded && <Spinner />} 
      {isLoaded && 
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
            >
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      }
    </div>
  )
}