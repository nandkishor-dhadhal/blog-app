import { useFormik } from "formik";
import { type SignUp } from "../common/types";
import * as Yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { Form, useActionData } from "react-router-dom";
import {
  validateConfirmPassword,
  validateMail,
  validatePassword,
} from "../validators/validators";
// import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const actionData = useActionData() as { error?: string } | undefined;

  const initialValues: SignUp = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });

  const formik = useFormik<SignUp>({
    initialValues,
    validate: (values) => {
      const errors: Partial<SignUp> = {};
      const emailErrors = validateMail(values);
      const passwordErrors = validatePassword(values);
      const confirmPasswordErrors = validateConfirmPassword(values);

      if (emailErrors.email) {
        errors.email = emailErrors.email;
      }
      if (passwordErrors.password) {
        errors.password = passwordErrors.password;
      }
      if (confirmPasswordErrors.confirmPassword) {
        errors.confirmPassword = confirmPasswordErrors.confirmPassword;
      }
      return errors;
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            Create Account
          </h2>
          <p className="text-sm text-gray-600">
            Join us and start your journey today
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                  placeholder="John"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                  placeholder="Doe"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700"
              >
                Email Address
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                  placeholder="john@prominentpixel.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {formik.errors.email}
                </p>
              )}
            </div>

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
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Confirm Password
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
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white outline-none text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-2">
              <PasswordStrengthBar password={formik.values.password} />
            </div>

            <button
              type="submit"
              disabled={!formik.isValid}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            >
              Create Account
            </button>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="login"
                className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
