const connect = require("../connect");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    if (tipo) { //se chega um tipo, ele define a query com o tipo. se nao chega, define sem.
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
          if (err.code === "ER_DUP_ENTRY") { //se o erro que chegar for de entrada duplicada, entra no if e retorna status 409.
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
  static async getDocenteByName(req, res) {
    const { nome } = req.params;
    const query = `SELECT * FROM docente WHERE nome LIKE ?`;
    const value = [`%${nome}%`]; //seleciona independente do lugar em que está o nome
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
    const { id_docente, senha, nome, tipo } = req.body;

    if (!senha || !nome || !id_docente) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    let query;
    let values;

    if (tipo) { //se chega um tipo, ele define a query com o tipo. se nao chega, define sem.
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
          return res.status(500).json({ error: "Erro interno no servidor!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso!", id_docente });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  static async deleteDocente(req, res) {
    const identificadorDocente = req.params;
    const query = `DELETE FROM docente WHERE email=?`;
    const value = [identificadorDocente.email];
    try {
      connect.query(query, value, function (err, results) {
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

  static async login(req, res, next) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `SELECT * FROM docente WHERE email=?`;
    const value = [email, senha];
    try {
      connect.query(query, value, async function (err, results) {
        if (err) {
          console.log(err);
          next(err);
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