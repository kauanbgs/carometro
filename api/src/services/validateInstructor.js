module.exports = function validateInstructor(
  { name, email, password },
  isUpdate = false,
) {
  if (isUpdate) {
    if (!name || !password) {
      return { error: "All fields must be filled" };
    }
  } else {
    if (!name || !email || !password) {
      return { error: "All fields must be filled" };
    }

    if (!email.includes("@")) {
      return { error: "Invalid Email. Need the '@' symbol" };
    }
    return null;
  }
};
