module.exports = async function validateOccurrence(
  { type, description, fk_id_student, fk_id_instructor },
  isUpdate = false,
) {
  if (isUpdate) {
    if (!type || !description || !fk_id_student) {
      return { error: "All fields must be filled to be able to update it" };
    }
  } else {
    if (!type || !description || !fk_id_student || !fk_id_instructor) {
      return { error: "All fields must be filled to be able to create it" };
    }
    return null;
  }
};
