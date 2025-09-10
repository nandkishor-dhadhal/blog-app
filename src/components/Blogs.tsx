import { Link } from "react-router-dom";
import type { Blog } from "../common/types";

interface BlogsProps {
  blogData: Blog;
}

const BlogCard: React.FC<BlogsProps> = ({ blogData }) => {
  return (
    <div className="max-h-fit max-w-fit bg-gray-700 rounded-3xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-gray-600 hover:-translate-y-1 p-4 shadow-md">
      <div className="relative w-1/2 h-1/2 overflow-hidden flex rounded-3xl">
      
        <img
          src={blogData.image}
          alt={blogData.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded-full text-xs font-medium">
            {blogData.tag}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-white leading-tight hover:text-blue-400 transition-colors duration-200 cursor-pointer line-clamp-2">
          {blogData.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {blogData.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="text-gray-400">
            <span className="text-xs">By </span>
            <span className="text-blue-400 font-medium hover:text-blue-300 transition-colors duration-200 text-xs">
              {blogData.authors.name}
            </span>
          </div>

          <Link
            to={`/blogs/${blogData.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-all duration-200 hover:shadow-md"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
