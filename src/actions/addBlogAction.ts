import { redirect } from "react-router-dom";
import type { Blog } from "../common/types";
import { FIREBASE_URL } from "../services/api";

export const addBlogAction = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();

    const tag = (formData.get("tag") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const authorName = (formData.get("authors.name") as string)?.trim();
    const authorAvatar = (formData.get("authors.avatar") as string)?.trim();

    if (!tag || !title || !image || !description || !authorName || !authorAvatar) {
      return { error: "All fields are required." };
    }

    const newBlog: Blog = {
      id: Date.now().toString(),
      tag,
      title,
      image,
      description,
      authors: {
        name: authorName,
        avatar: authorAvatar,
      },
    };

    const response = await fetch(`${FIREBASE_URL}/blogs.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    });

    if (!response.ok) {
      return { error: `Failed to add blog. Status: ${response.status}` };
    }

    return redirect("/blogs");
  } catch (error) {
    return {
      error: `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
