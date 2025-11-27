const connect = require("../connect");

module.exports = class ocorrenciaController {
  static async createOcorrencia(req, res, next) {
    let { tipo, descricao, fk_id_estudante, id_docente } = req.body;

    if (!tipo || !descricao || !fk_id_estudante || !id_docente) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `CALL criarOcorrencia(?, ?, ?, ?)`;
    const values = [tipo, descricao, fk_id_estudante, id_docente];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              error: "Ocorrência já cadastrada. Tente outro.",
            });
          }
          return next(err);
        }
        return res.status(201).json({
          message: "Ocorrência criada com sucesso! (com procedure) ",
        });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getOcorrenciaByIdAluno(req, res, next) {
    const { fk_id_estudante } = req.params;
    const query = "SELECT * FROM ocorrencia WHERE fk_id_estudante = ?";
    const values = [fk_id_estudante];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ error: "Nenhuma ocorrência registrada!" });
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      return next(error);
    }
  }

  static async readOcorrencias(req, res, next) {
    const query = "SELECT * FROM ocorrencia";
    try {
      connect.query(query, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Nenhum docente encontrado!" });
        }
        return res.status(200).json(results);
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateOcorrencia(req, res, next) {
    const { id_ocorrencia } = req.params;
    let { tipo, descricao, fk_id_estudante } = req.body;
    if (!tipo || !descricao || !fk_id_estudante) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query =
      "UPDATE ocorrencia SET tipo=?, descricao=?, fk_id_estudante=? WHERE id_ocorrencia=?";
    const values = [tipo, descricao, fk_id_estudante, id_ocorrencia];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Ocorrência não encontrada!" });
        }
        return res
          .status(200)
          .json({ message: "Ocorrência atualizada: ", id_ocorrencia });
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteOcorrencia(req, res, next) {
    const { id_ocorrencia } = req.params;
    const query = "DELETE FROM ocorrencia WHERE id_ocorrencia = ?";
    const values = [id_ocorrencia];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          return next(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Ocorrência não encontrada!" });
        }
        return res
          .status(200)
          .json({ message: `Ocorrência excluida: ${id_ocorrencia}` });
      });
    } catch (error) {
      return next(error);
    }
  }
};
