import { useParams, Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { blogData } = useBlog();
  const blog = blogData.find((b) => b.id.toLowerCase() === id);

  if (!blog) return <div>Blog not found</div>;

  const relatedBlogs = blogData.filter((b) => b.id.toString() !== id);

  return (
    <div className="max-w-10xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {blog.tag}
          </span>

          <div className="flex flex-col items-center mb-6">
            <img
              className="rounded-full w-24 h-24 object-cover border-2 border-gray-300"
              src={
                blog.authors.avatar ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt={blog.authors.name}
            />
            <h1 className="mt-3 text-xl font-semibold text-gray-800">
              Author - {blog.authors.name}
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h2>
          <img
            className="w-1/4 max-h-96 rounded-md mb-6 object-cover"
            src={blog.image}
            alt={blog.title}
          />

          <p className="text-gray-700 leading-relaxed">{blog.description}</p>
        </div>

        <aside className="w-full md:w-1/3 bg-gray-50 p-4 rounded">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Related Blogs
          </h3>

          <div className="flex flex-col gap-4">
            {relatedBlogs.map((related) => (
              <Link
                key={related.id}
                to={`/blogs/${related.id}`}
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
                className="block p-4 border rounded hover:bg-gray-100 transition"
              >
                <h4 className="text-lg font-medium text-blue-600">
                  {related.title}
                </h4>
                <p className="text-gray-600 mt-1 text-sm">
                  {related.description.length > 100
                    ? related.description.slice(0, 100) + "..."
                    : related.description}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;
