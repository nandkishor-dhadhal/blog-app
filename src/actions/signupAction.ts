import { redirect } from "react-router-dom";
import type { SignUp } from "../common/types";
import { FIREBASE_URL } from "../services/api";

export const signupAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !username || !email || !password) {
    return { error: "All fields are required" };
  }

  const existingUsersResponse = await fetch(`${FIREBASE_URL}/usersData.json`);
  const existingUsersData = await existingUsersResponse.json();
  const existingUsers: SignUp[] = existingUsersData
    ? Object.values(existingUsersData)
    : [];

  const userExists = existingUsers.some((user) => user.email === email);
  if (userExists) {
    return { error: "User with this email already exists" };
  }

  const newUser = { firstName, lastName, username, email, password };

  await fetch(`${FIREBASE_URL}/usersData.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  

  return redirect("/login");
};
