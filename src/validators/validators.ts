import type { Blog, SignUp } from "../common/types";

export const validateMail = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const email = userDataValues.email.trim();

  if (email.includes("@")) {
    const domain = email.split("@")[1];
    if (domain !== "prominentpixel.com") {
      errors.email = "Only 'prominentpixel.com' email addresses are allowed.";
    }
  } else {
    errors.email = "Email must contain '@'.";
  }

  return errors;
};
export const validatePassword = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const password = userDataValues.password.trim();
  if (!password) {
    errors.password = "Password is required";
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must include at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must include at least one number.";
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~/-]/.test(password)) {
      errors.password = "Password must include at least one special character.";
    }
  }
  return errors;
};

export const validateConfirmPassword = (userDataValues: SignUp) => {
  const errors: Partial<SignUp> = {};
  const confirmPassword = userDataValues.confirmPassword;
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required.";
  } else if (userDataValues.password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
};

export const descriptionValidator = (userDataValues: Omit<Blog, "id">) => {
  const errors: Partial<typeof userDataValues> = {};
  const description = userDataValues.description.trim();

  if (description.length < 50) {
    errors.description = "A minimum of 50 letters is required.";
  }

  return errors;
};
