export const validateEmail = (email, users) => {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return "Email already exists. Please try with a different email.";
  }
  return null;
};
