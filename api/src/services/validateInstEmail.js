const connect = require("../connect");

module.exports = async function validateEmail(email, id_instructor = null) {
  const query = "SELECT id_instructor FROM instructor WHERE email = ?";
  return new Promise((resolve, reject) => {
    connect.query(query, [email], (err, results) => {
      if (err) {
        reject("Error verifying email");
      } else if (results.length > 0) {
        const id_instructorFinded = results[0].id_instructor;
        
        if (id_instructor && id_instructorFinded === id_instructor) { // vai ver se tem o bgl (id_inst = true && a outra condição -> fácil por sinal)
          resolve(null); // ta suave -> email não está em uso -> resolve e reject são funções de uma PROMISE
        } else {
          resolve({ error: "Email already being used by another user" });
        }
      } else {
        resolve(null);
      }
    });
  });
};
