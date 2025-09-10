import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { FIREBASE_URL } from "../services/api";

const MyBlogs = () => {
  const { user } = useAuth();
  const { blogData, setBlogData } = useBlog();
  const navigate = useNavigate();
  const userName = user?.username;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const myBlogData = blogData.filter((blog) => blog.authors.name === userName);

  const handleEdit = (firebaseKey: string) => {
    navigate(`/blogs/edit-blog/${firebaseKey}`);
  };

  const handleDelete = async (firebaseKey: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    setLoading(firebaseKey);

    try {
      const response = await fetch(
        `${FIREBASE_URL}/blogs/${firebaseKey}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete. Status: ${response.status}`);
      }

      setBlogData(blogData.filter((blog) => blog.firebaseKey !== firebaseKey));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {myBlogData.length === 0 ? (
        <div className="flex-colum justify-center">
          <div className="text-gray-600 text-lg mt-10 p-5">
            No blogs found for you.
          </div>
          <div className="flex justify-center ">
            <button onClick={() => {navigate('/blogs/add-blog')}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Blog</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start items-start">
          {myBlogData.map((blog) => (
            <div
              key={blog.firebaseKey}
              className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden m-4"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-2">
                  {blog.description.substring(0, 200)}...
                </p>
                <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">
                  {blog.tag}
                </span>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog.firebaseKey)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.firebaseKey)}
                    disabled={loading === blog.firebaseKey}
                    className={`flex-1 text-white px-4 py-2 rounded ${
                      loading === blog.firebaseKey
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {loading === blog.firebaseKey ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
