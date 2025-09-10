import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { FIREBASE_URL } from "../services/api";

export const editBlogAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const firebaseKey = params.firebaseKey;

  if (!firebaseKey) {
    return { error: "Blog Firebase key is missing." };
  }

  try {
    const formData = await request.formData();
    const tag = (formData.get("tag") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const image = (formData.get("image") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const authorName = (formData.get("authors.name") as string)?.trim();
    const authorAvatar = (formData.get("authors.avatar") as string)?.trim();

    if (
      !tag ||
      !title ||
      !image ||
      !description ||
      !authorName ||
      !authorAvatar
    ) {
      return { error: "All fields are required." };
    }

    const checkResponse = await fetch(
      `${FIREBASE_URL}/blogs/${firebaseKey}.json`
    );

    if (!checkResponse.ok) {
      return { error: `Blog not found. Status: ${checkResponse.status}` };
    }

    const existingBlog = await checkResponse.json();
    if (!existingBlog) {
      return { error: `Blog does not exist.` };
    }

    const updatedBlog = {
      ...existingBlog,
      tag,
      title,
      image,
      description,
      authors: {
        name: authorName,
        avatar: authorAvatar,
      },
    };

    const response = await fetch(`${FIREBASE_URL}/blogs/${firebaseKey}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        error: `Failed to update blog. Status: ${response.status}, Error: ${errorText}`,
      };
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
