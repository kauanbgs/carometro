const connect = require("../connect");

module.exports = class estudanteController {
  static async createEstudante(req, res, next) {
    const { nome, email, telefone, status, numero_aluno, fk_id_turma } =
      req.body;
    if (
      !nome ||
      !email ||
      !telefone ||
      !status ||
      !numero_aluno ||
      !fk_id_turma
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `INSERT INTO estudante (nome, email, telefone, status, numero_aluno, fk_id_turma) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [nome, email, telefone, status, numero_aluno, fk_id_turma];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res
          .status(201)
          .json({ message: "Estudante criado com sucesso!" });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async readEstudante(req, res, next) {
    const query = "SELECT * FROM estudante";
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res
            .status(404)
            .json({ error: "Nenhum estudante encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo estudantes:", alunos: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getEstudanteByID(req, res, next) {
    const { id_estudante } = req.params;
    if (!id_estudante) {
      return res.status(400).json({ error: "ID do estudante é obrigatório!" });
    }
    const query = "SELECT * FROM estudante WHERE id_estudante = ?";
    const values = [id_estudante];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Estudante não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Estudante: ", estudante: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getEstudanteByNumero(req, res, next) {
    const { numero_aluno } = req.params;
    const query = "SELECT * FROM estudante WHERE numero_aluno = ?";
    const values = [numero_aluno];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Estudante não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Estudante: ", estudante: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getEstudanteByName(req, res, next) {
    const { nome } = req.params;
    const query = "SELECT * FROM estudante WHERE nome LIKE ?";
    const values = [`%${nome}%`];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Estudante não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Estudante: ", estudante: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getEstudanteBystatus(req, res, next) {
    const { status } = req.params;
    const query = "SELECT * FROM estudante WHERE status = ?";
    const values = [status];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Estudante não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Estudante: ", estudante: results });
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async updateEstudante(req, res, next) {
    const { id_estudante } = req.params;
    const {
      nome,
      email,
      telefone,
      data_criacao,
      status,
      numero_aluno,
      fk_id_turma,
    } = req.body;

    if (
      !nome ||
      !email ||
      !telefone ||
      !data_criacao ||
      !status ||
      !numero_aluno ||
      !fk_id_turma ||
      !id_estudante
    ) {
      return next(res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" }));
    }

    const query = `UPDATE estudante SET nome=?, email=?, telefone=?, data_criacao=?, status=?, numero_aluno=?, fk_id_turma=? WHERE id_estudante=?`;
    const values = [
      nome,
      email,
      telefone,
      data_criacao,
      status,
      numero_aluno,
      fk_id_turma,
      id_estudante,
    ];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (results.affectedRows === 0) {
          return next(res.status(404).json({ error: "Estudante não encontrado!" }));
        }
        return res
          .status(200)
          .json({ message: "Estudante atualizado: ", id_estudante });
      });
    } catch (error) {
      console.error(error);
      return next(res.status(500).json({ error: "Erro interno no servidor" }));
    }
  }

  static async deleteEstudante(req, res, next) {
    const { id_estudante } = req.params;
    if (!id_estudante) {
      return res
        .status(400)
        .json({ error: "O ID do estudante deve ser fornecido!" });
    }
    const query = "DELETE FROM estudante WHERE id_estudante = ?";
    const values = [id_estudante];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return next(res.status(500).json({ error: "Erro interno no servidor" }));
        }
        if (results.affectedRows === 0) {
          return next(res.status(404).json({ error: "Estudante não encontrado!" }));
        }
        return res
          .status(200)
          .json({ message: "Estudante deletado com sucesso: ", id_estudante });
      });
    } catch (error) {
      console.error(error);
      return next(res.status(500).json({ error: "Erro interno no servidor" }));
    }
  }
};
