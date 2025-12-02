//NAO USAR PRETTIER
const connect = require("../connect");

module.exports = class turmaController {
  static async createTurma(req, res, next) {
    const { nome, fk_id_docente } = req.body;
    if (!nome || !fk_id_docente) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = "INSERT INTO turma (nome, fk_id_docente) VALUES (?, ?)";
    const values = [nome, fk_id_docente];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "Turma já cadastrada no sistema!" });
          }
          console.error(err);
          return next(err);
        }
        return res
          .status(201)
          .json({ message: "Turma cadastrada com sucesso!" });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readTurma(req, res, next) {
    const query = `
      SELECT turma.nome as nome_turma, docente.nome as nome_docente, turma.id_turma as id_turma 
      FROM turma 
      JOIN docente ON turma.fk_id_docente = docente.id_docente
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readTurmaByID(req, res, next) {
    const { id_turma } = req.query;
    if (!id_turma) {
      return res.status(400).json({ error: "ID da turma é obrigatório!" });
    }
    const query = `
      SELECT turma.nome as nome_turma, docente.nome as nome_docente, turma.id_turma as id_turma 
      FROM turma 
      JOIN docente ON turma.fk_id_docente = docente.id_docente 
      WHERE turma.id_turma = ?
    `;
    const values = [id_turma];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async GetTurmaByDocenteID(req, res, next) {
    const { fk_id_docente } = req.params;
    if (!fk_id_docente) {
      return res.status(400).json({ error: "ID do docente é obrigatório!" });
    }
    const query = "SELECT * FROM turma WHERE fk_id_docente = ?";
    const values = [fk_id_docente];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "Nenhuma turma encontrada para este docente." });
        }
        return res
          .status(200)
          .json({ message: "Turmas encontradas:", turmas: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async GetTurmaByName(req, res, next) {
    const { nome } = req.params;
    const query = "SELECT * FROM turma WHERE nome LIKE ?";
    const values = [`%${nome}%`];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "Nenhuma turma encontrada com este nome." });
        }
        return res
          .status(200)
          .json({ message: "Turmas encontradas:", turmas: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async updateTurma(req, res, next) {
    const { nome } = req.body;
    const { id_turma } = req.params;

    if (!nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = "UPDATE turma SET nome = ? WHERE id_turma = ?";
    const values = [nome, id_turma];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Turma não encontrada!" });
        }
        return res
          .status(200)
          .json({ message: "Turma atualizada com sucesso!", id_turma });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async deleteTurma(req, res, next) {
    const id_turma = req.params.id_turma;
    if (!id_turma) {
      return res
        .status(400)
        .json({ error: "O ID da turma deve ser fornecido!" });
    }
    const query = "DELETE FROM turma WHERE id_turma = ?";
    const values = [id_turma];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Turma não encontrada!" });
        }
        return res
          .status(200)
          .json({ message: "Turma deletada com sucesso: ", id_turma });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readTurmaDocente(req, res, next) {
    const query = `
      SELECT * FROM vw_gerenciar_turmas;
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readAlunosTurma(req, res, next) {
    const query = `
      SELECT * FROM vw_editar_turma;
    `;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
