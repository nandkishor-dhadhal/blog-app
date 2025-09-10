import { createContext, useContext, useState, useEffect } from "react";
import type { Blog } from "../common/types";
import { FIREBASE_URL } from "../services/api";

interface BlogContextType {
  blogData: (Blog & { firebaseKey: string })[];
  setBlogData: (blogs: (Blog & { firebaseKey: string })[]) => void;
  fetchBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogData, setBlogData] = useState<(Blog & { firebaseKey: string })[]>(
    []
  );

  // This thing have to do for delete because we firebaseKey for delect request
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${FIREBASE_URL}/blogs.json`);
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = (await response.json()) as Record<string, Blog>;

      const blogsArray: (Blog & { firebaseKey: string })[] = Object.entries(
        data || {}
      ).map(([firebaseKey, blog]) => ({
        firebaseKey,
        ...blog,
      }));

      setBlogData(blogsArray);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [blogData]);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData, fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
