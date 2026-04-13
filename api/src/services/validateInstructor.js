module.exports = function validateInstructor({
  name,
  email,
  password,
  role
}) {
  if (!name || !email || !password || !role) {
    return { error: "All fields must be filled" };
  }

  if (!email.includes("@")) {
    return { error: "Invalid Email. Need the '@' symbol" };
  }

  return null;

};