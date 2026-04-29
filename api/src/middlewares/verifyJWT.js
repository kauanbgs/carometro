const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ auth: false, message: "Token não fornecido!" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "Token não fornecido!" });
  }
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      if(err.name === "TokenExpiredError"){
        return res
        .status(401)
        .json({auth: false, message: "Expired Token!"})
      }

      return res
        .status(403)
        .json({ auth: false, message: "Falha na autenticação do token." });
    }

    req.userId = decoded.cpf;
    next();
  });
}

module.exports = verifyJWT;