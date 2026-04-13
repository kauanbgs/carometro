const connect = require("../db/connect");

module.exports = async function validateEmail(email, id_instructor = null) {
  const query = "SELECT id_instructor FROM instructor WHERE email = ?";
  return new Promise((resolve, reject) => {
    connect.query(query, [email], (err, results) => {
      if (err) {
        reject("Erro ao verificar email");
      } else if (results.length > 0) {
        const IdFound = results[0].id_instructor;
        
        if (id_instructor && IdFound !== id_instructor) {
          resolve({ error: "Email already being used by another user" });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};
