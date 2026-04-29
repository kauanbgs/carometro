module.exports = function validateClass({ name, fk_id_instructor }) {
  if (!name) {
    return { error: "All fields must be filled" };
  }
  return null;
};