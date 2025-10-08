const connect = require("../db/connect");

module.exports = class estudanteController {
  static async createTurma(req, res) {
    const { nome, fk_id_docente } = req.body;

    if (!nome || !fk_id_docente) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `INSERT INTO turma (nome, fk_id_docente) VALUES (?, ?)`;
    const values = [nome, fk_id_docente];

    connect.query(query, values, function (err, results) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ error: "Turma já cadastrada no sistema!" });
        } else {
          console.log(err);
          return res
            .status(500)
            .json({
              error: "Erro interno no servidor... Turma não foi cadastrada!",
            });
        }
      }

      return res.status(201).json({ message: "Turma cadastrada com sucesso!" });
    });
  }
  static async readTurma(req, res) {
    const query = `SELECT * FROM turma`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          res.status(500).json({ error: "Erro interno no servidor!" });
        }

        return res.status(200).json({
          message: "Obtendo turmas:",
          turma: results,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor!" });
    }
  }
  static async getTurmaById(req, res) {
    const { id_turma } = req.params;
    const query = `SELECT * FROM turma WHERE id_turma=?`;
    const value = [id_turma];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        return res.status(200).json({ message: "Turma: ", turma: results});
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};
