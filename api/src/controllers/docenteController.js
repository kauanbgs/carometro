const connect = require("../connect");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = class docenteController {
  static async createDocente(req, res, next) {
    const { email, senha, nome, tipo } = req.body;
    if (!email || !senha || !nome) {
      return next(new Error("Todos os campos devem ser preenchidos"));
    }
    let query;
    let value;
    if (tipo) {
      query = `INSERT INTO docente (email, senha, nome, tipo) VALUES (?,?,?,?)`;
      value = [email, senha, nome, tipo];
    } else {
      query = `INSERT INTO docente (email, senha, nome) VALUES (?,?,?)`;
      value = [email, senha, nome];
    }
    const hash = await bcrypt.hash(senha, saltRounds);
    value[1] = hash;
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          if (err.code === "ER_DUP_ENTRY") {
            return next(new Error("Email já cadastrado. Tente outro."));
          }
          return next(err);
        }
        console.log("Inserido no MySQL");
        res.status(201).json({ message: "Docente criado com sucesso!" });
      });
    } catch (error) {
      next(error);
    }
  }

  static async readDocente(req, res, next) {
    const query = `SELECT * FROM docente`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos os docentes ", docentes: results });
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDocenteById(req, res, next) {
    const { id_docente } = req.params;
    const query = `SELECT * FROM docente WHERE id_docente=?`;
    const value = [id_docente];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.status(200).json({ message: `Docente: `, docente: results });
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDocenteByName(req, res, next) {
    const { nome } = req.params;
    const query = `SELECT * FROM docente WHERE nome LIKE ?`;
    const value = [`%${nome}%`];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Usuario não encontrado!"));
        }
        return res.status(200).json({ message: `Docente: `, docente: results });
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDocente(req, res, next) {
    const { id_docente, senha, nome, tipo } = req.body;

    if (!senha || !nome || !id_docente) {
      return next(new Error("Todos os campos devem ser preenchidos"));
    }

    let query;
    let values;

    if (tipo) {
      query = `UPDATE docente SET senha = ?, nome = ?, tipo = ? WHERE id_docente = ?`;
      values = [senha, nome, tipo, id_docente];
    } else {
      query = `UPDATE docente SET senha = ?, nome = ? WHERE id_docente = ?`;
      values = [senha, nome, id_docente];
    }
    const hash = await bcrypt.hash(senha, saltRounds);
    values[0] = hash;
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(new Error("Usuário não encontrado!"));
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso!", id_docente });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDocente(req, res, next) {
    const { email, senha } = req.body;

    if (!senha || !email) {
      return next(new Error("Todos os campos devem ser preenchidos"));
    }

    try {
      const querySelect = `SELECT * FROM docente WHERE email=?`;
      connect.query(querySelect, [email], async function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Usuário não foi encontrado"));
        }

        const docente = results[0];
        const senhaCorreta = await bcrypt.compare(senha, docente.senha);
        if (!senhaCorreta) {
          return next(new Error("Senha incorreta!"));
        }

        const queryDelete = `DELETE FROM docente WHERE email=?`;
        connect.query(queryDelete, [email], function (errDel, resultsDel) {
          if (errDel) {
            console.error(errDel);
            return next(errDel);
          }
          return res.status(200).json({ message: "Usuário excluído com sucesso!" });
        });
      });
    } catch (error) {
      next(error);
    }
  }


  static async login(req, res, next) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return next(new Error("Todos os campos devem ser preenchidos"));
    }
    const query = `SELECT * FROM docente WHERE email=?`;
    const value = [email];
    try {
      connect.query(query, value, async function (err, results) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (results.length === 0) {
          return next(new Error("Usuario não encontrado!"));
        }
        const docente = results[0];
        const senhaCorreta = await bcrypt.compare(senha, docente.senha);
        if (!senhaCorreta) {
          return next(new Error("Senha incorreta!"));
        }
        return res.status(200).json({ message: "Usuario encontrado!", docente });
      });
    } catch (error) {
      next(error);
    }
  }
};