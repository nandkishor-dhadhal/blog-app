import { redirect } from "react-router-dom";
import type { Login } from "../common/types";
import { FIREBASE_URL } from "../services/api";

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = (formData.get("username") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const response = await fetch(`${FIREBASE_URL}/usersData.json`);
    if (!response.ok) {
      return { error: "Server error. Please try again." };
    }

    const usersData = await response.json();
    if (!usersData) {
      return { error: "No user data found." };
    }

    const users: Login[] = Object.values(usersData);
    const user = users.find(
      (u) =>
        u.username?.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      return { error: "Invalid username or password" };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.dispatchEvent(new Event("localStorageUpdated"));

    return redirect("/blogs");
  } catch {
    return { error: "Network error. Please try again." };
  }
};
