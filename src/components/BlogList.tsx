import BlogCard from "./Blogs";
import { useBlog } from "../context/BlogContext";

const BlogList = () => {
  const { blogData } = useBlog();

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Latest Blog Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((blog) => (
            <BlogCard key={blog.id} blogData={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
