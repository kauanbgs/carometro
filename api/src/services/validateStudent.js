module.exports = async function validateStudent(
  { name, email, status, fk_id_class }
) {
  if (!name || status === undefined || !fk_id_class) {
    return { error: "All required fields (name, status, class) must be filled" };
  }

  if (email && !email.includes("@")) {
    return { error: "Invalid Email. Need the '@' symbol" };
  }
  return null;
};
