function verifyAdmin(req, res, next) {
  if (req.userRole !== "adm") {
    return res
      .status(403)
      .json({ auth: false, message: "Acesso restrito a administradores." });
  }
  next();
}

module.exports = verifyAdmin;
