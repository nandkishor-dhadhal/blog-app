import { useFormik } from "formik";
import { type Login } from "../common/types";
import * as Yup from "yup";
import { useActionData, Form, useNavigation } from "react-router-dom";

const LoginPage = () => {
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const initialValues: Login = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<Login>({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {actionData?.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {actionData.error}
              </p>
            </div>
          )}
          <Form method="post" className="space-y-4" noValidate>
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <svg
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                  placeholder="johndoe"
                  disabled={isSubmitting}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {formik.errors.password}
                </p>
              )}
            </div>

            
            <button
              type="submit"
              disabled={isSubmitting || !formik.values.username || !formik.values.password}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="signup"
                className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;