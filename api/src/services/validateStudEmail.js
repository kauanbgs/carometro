const connect = require("../connect");

module.exports = async function validateEmail(email, id_student = null) {
  if (!email) {
    return null; // Don't check for duplicate if email is not provided
  }

  const query = "SELECT id_student FROM student WHERE email = ?";
  return new Promise((resolve, reject) => {
    connect.query(query, [email], (err, results) => {
      if (err) {
        reject("Error verifying email");
      } else if (results.length > 0) {
        const id_studentFinded = results[0].id_student;
        
        if (id_student && id_studentFinded === id_student) { 
          resolve(null); 
        } else {
          resolve({ error: "Email already being used by another user" });
        }
      } else {
        resolve(null);
      }
    });
  });
};
