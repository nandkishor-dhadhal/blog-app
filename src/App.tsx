import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { router } from "./router";

const App = () => (
  <AuthProvider>
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  </AuthProvider>
);

export default App;
