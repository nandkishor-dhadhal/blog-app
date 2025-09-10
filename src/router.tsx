/* eslint-disable react-refresh/only-export-components */
// routes.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddBlog from "./pages/AddBlog";
import BlogDetail from "./pages/BlogDetail";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import ErrorPage from "./components/ErrorPage";
import { signupAction } from "./actions/signupAction";
import { loginAction } from "./actions/loginAction";
import { addBlogAction } from "./actions/addBlogAction";
import { editBlogAction } from "./actions/editBlogAction";
import { useAuth } from "./context/AuthContext";
import type { JSX } from "react";

const Protected = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const LoginWrapper = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/blogs" replace /> : <LoginPage />;
};

const SignupWrapper = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/blogs" replace /> : <SignUpPage />;
};

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/blogs" replace /> },
  {
    path: "/blogs",
    element: (
      <Protected>
        <AppLayout />
      </Protected>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "add-blog", element: <AddBlog />, action: addBlogAction },
      { path: ":id", element: <BlogDetail /> },
      { path: "my-blogs", element: <MyBlogs /> },
      { path: "edit-blog/:firebaseKey", element: <EditBlog />, action: editBlogAction },
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
  { path: "*", element: <ErrorPage /> },
]);
