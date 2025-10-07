const connect = require("../db/connect");

module.exports = class docenteController {
  static async createDocente(req, res) {
    const { email, senha, nome, tipo } = req.body;
    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
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

    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ error: "Email já cadastrado. Tente outro." });
          }
          return res
            .status(500)
            .json({ error: "Docente não cadastrado no banco de dados" });
        }
        console.log("Inserido no MySQL");
        res.status(201).json({ message: "Docente criado com sucesso!" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  static async readDocente(req, res) {
    const query = `SELECT * FROM docente`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos os docentes ", docentes: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  static async getDocenteById(req, res) {
    const { id_docente } = req.params;
    const query = `SELECT * FROM docente WHERE id_docente=?`;
    const value = [id_docente];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        return res.status(200).json({ message: `Docente: `, docente: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  static async getDocenteByNome(req, res) {
    const { nome } = req.params;
    const query = `SELECT * FROM docente WHERE nome LIKE ?`;
    const value = [`%${nome}%`];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Usuario não encontrado!" });
        }
        return res.status(200).json({ message: `Docente: `, docente: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async updateDocente(req, res) {
    const { id_docente, email, senha, nome, tipo } = req.body;
    if (!email || !senha || !nome || !id_docente) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE docente SET email=?, senha=?, nome=?, tipo=? WHERE id_docente=?`;
    const value = [email, senha, nome, tipo, id_docente];

    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(409)
              .json({ error: "Email já está sendo usado por outro docente." });
          }
          return res.status(500).json({ error: "Erro interno no servidor!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuario nao encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com ID: " + id_docente });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  static async deleteDocente(req, res) {
    const identificadorDocente = req.params.id_docente;
    const query = `DELETE FROM docente WHERE id_docente=?`;
    try {
      connect.query(query, [identificadorDocente], function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não foi encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Usuário excluido: " + identificadorDocente });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro de servidor" });
    }
  }
};
