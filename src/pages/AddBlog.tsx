import * as Yup from "yup";
import { useFormik } from "formik";
import type { Blog } from "../common/types";
import { useAuth } from "../context/AuthContext";
import { useSubmit, useActionData } from "react-router-dom";
import { descriptionValidator } from "../validators/validators";

const AddBlog = () => {
  const submit = useSubmit();
  const { user } = useAuth();
  const actionData = useActionData() as { error?: string } | undefined;

  const initialValues: Omit<Blog, "id"> = {
    title: "",
    tag: "",
    image: "",
    description: "",
    authors: {
      name: user?.username || "",
      avatar: "",
    },
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    tag: Yup.string().required("Tag is required"),
    image: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    description: Yup.string().required("Description is required"),
    authors: Yup.object({
      avatar: Yup.string()
        .url("Must be a valid URL")
        .required("Author avatar URL is required"),
    }),
  });

  

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<typeof initialValues> = {};
      const descriptionErrors = descriptionValidator(values);
      if (descriptionErrors.description) {
        errors.description = descriptionErrors.description;
      }
      return errors;
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("tag", values.tag);
      formData.append("title", values.title);
      formData.append("image", values.image);
      formData.append("description", values.description);
      formData.append("authors.name", values.authors.name);
      formData.append("authors.avatar", values.authors.avatar);

      submit(formData, { method: "post" });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Share your thoughts and stories with the world
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {actionData?.error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{actionData.error}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tag *
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={formik.values.tag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formik.touched.tag && formik.errors.tag
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Technology, Lifestyle, etc."
              />
              {formik.touched.tag && formik.errors.tag && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.tag}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your blog title..."
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Featured Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formik.touched.image && formik.errors.image
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {formik.touched.image && formik.errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.image}
                </p>
              )}
              {formik.values.image && !formik.errors.image && (
                <div className="mt-2">
                  <img
                    src={formik.values.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Write your blog content here..."
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Author Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="authors.name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Author Name (Can't Change)
                  </label>
                  <input
                    disabled
                    type="text"
                    id="authors.name"
                    name="authors.name"
                    value={formik.values.authors.name}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 border-gray-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="authors.avatar"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Author Avatar URL *
                  </label>
                  <input
                    type="url"
                    id="authors.avatar"
                    name="authors.avatar"
                    value={formik.values.authors.avatar}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      formik.touched.authors?.avatar &&
                      formik.errors.authors?.avatar
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  {formik.touched.authors?.avatar &&
                    formik.errors.authors?.avatar && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.authors.avatar}
                      </p>
                    )}
                  {formik.values.authors.avatar &&
                    !formik.errors.authors?.avatar && (
                      <div className="mt-2">
                        <img
                          src={formik.values.authors.avatar}
                          alt="Author avatar preview"
                          className="w-16 h-16 object-cover rounded-full border"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 text-sm rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {formik.isSubmitting ? "Publishing..." : "Publish Blog"}
              </button>
              <button
                type="button"
                onClick={() => formik.resetForm()}
                className="bg-gray-200 text-gray-700 py-2 px-4 text-sm rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
