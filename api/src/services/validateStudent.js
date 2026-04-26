module.exports = async function validateInstructor(
  { name, email, phone, status, student_number, fk_id_class }
) {
  if (!name || !email || !phone || !status || !student_number || !fk_id_class) {
    return { error: "All fields must be filled" };
  }

  if (!email.includes("@")) {
    return { error: "Invalid Email. Need the '@' symbol" };
  }
  return null;
};
