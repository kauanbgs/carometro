const connect = require("../db/connect");

module.exports = class turmaController {
  static async createTurma(req, res, next) {
    const { nome, fk_id_docente } = req.body;
    if (!nome || !fk_id_docente) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    const turmaData = { nome, fk_id_docente }
    try {
      await connect("turma").insert(turmaData)
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Turma já cadastrada no sistema!" });
        }
        next(error)
    }
      return res.status(201).json({ message: "Turma cadastrada com sucesso!" });
    };
  static async readTurma(req, res, next) {
    try {
      const turmas = await connect('turma').select("*")
      return res.status(200).json(turmas)
    } catch (error) {
      
    }
  }

  static async GetTurmaByDocenteID(req, res) {
    const { fk_id_docente } = req.params;
    if (!fk_id_docente) {
      return res.status(400).json({ error: "ID do docente é obrigatório!" });
    }
    try {
      
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "Nenhuma turma encontrada para este docente." });
        }

        return res.status(200).json({
          message: "Turmas encontradas:",
          turmas: results,
        });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor ao processar requisição." });
    }
  }

  static async GetTurmaByName(req, res) {
    const { nome } = req.params;
    const query = `SELECT * FROM turma WHERE nome LIKE ?`;
    const value = [`%${nome}%`];
    try {
      connect.query(query, value, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Turma não encontrada!" });
        }
        return res.status(200).json({ message: `Turma: `, turma: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  static async updateTurma(req, res) {
    const { nome } = req.body;
    const { id_turma } = req.params

    if ( !nome ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `UPDATE turma SET nome = ? WHERE id_turma = ?`;
    const values = [nome, id_turma];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno no servidor!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Turma não encontrada!" });
        }
        return res
          .status(200)
          .json({ message: "Turma atualizada com sucesso!", id_turma });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  static async deleteTurma(req, res) {
    console.log("Rs")
    const identificador_id_turma = req.params.id_turma;
    const query = `DELETE FROM turma WHERE id_turma=?`;

    if (!identificador_id_turma) {
      return res
        .status(400)
        .json({ error: "O ID da turma deve ser fornecido!" });
    }
    try {
      connect.query(
        query,
        [identificador_id_turma],
        function (err, results) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: "Erro interno no servidor! Turma não foi deletado!",
            });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Turma não encontrada!" });
          }
          return res.status(200).json({
            message: "Turma deletada com sucesso: ",
            identificador_id_turma,
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno no servidor!" });
    }
  }
};
