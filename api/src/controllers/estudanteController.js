//NAO USAR PRETTIER


const knexConfig = require("../../knexfile");  // Carrega a configuração
const knex = require('knex');  // Importa o Knex
const connect = knex(knexConfig);  // Cria a instância do Knex

module.exports = class estudanteController {
  static async createEstudante(req,res,next) {
    const { nome,email,telefone,data_criacao,status,numero_aluno,fk_id_turma } = req.body;
    if (!nome ||!email ||!telefone ||!data_criacao ||!status ||!numero_aluno ||!fk_id_turma) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    const estudanteData = { nome, email, telefone, data_criacao: data_criacao || knex.fn.now(), status, numero_aluno, fk_id_turma };
    try {
      await connect("estudante").insert(estudanteData)
      return res.status(201).json({ message: "Estudante criado com sucesso!"})
    } catch (error) {
      next(error)
    }
}

    static async readEstudante(req,res,next) {
      try {
        const estudanteData = await connect("estudante").select("*")
        if (estudanteData.length === 0) {
          return res.status(404).json({ error: "Nenhum estudante encontrado!" });
        }
        return res.status(200).json({message: "Obtendo estudantes:", alunos: estudanteData});
        }catch (error) {
          next(error)
      }
    }

  static async getEstudanteByID(req,res,next) {
    const { id_estudante } = req.params;
    if (!id_estudante) {
      return res.status(400).json({ error: "ID do estudante é obrigatório!" });
    }
    try {
      const estudanteData = await connect("estudante").select("*").where("id_estudante", "=", id_estudante)
      if (estudanteData.length === 0) {
        return res.status(404).json({ error: "Estudante não encontrado!" });
      }
      return res.status(200).json({ message: "Estudante: ", estudante: estudanteData });
      }catch (error) {
        next(error)
    }
  }
  static async getEstudanteByNumero(req,res,next) {
    const { numero_aluno } = req.params;
    try {
      const estudanteData = await connect("estudante").select("*").where("numero_aluno", "=", numero_aluno)
      if (estudanteData.length === 0) {
        return res.status(404).json({ error: "Estudante não encontrado!" });
      }
        return res.status(200).json({ message: "Estudante: ", estudante: estudanteData });
      }catch (error) {
        next(error)
    }
  }

  static async getEstudanteByName(req, res) {
    const { nome } = req.params;
    try {
      const estudanteData = await connect("estudante").select("*").where("nome", "LIKE", `%${nome}%`)
      if (estudanteData.length === 0) {
        return res.status(404).json({ error: "Estudante não encontrado!" });
      }
      return res.status(200).json({ message: "Estudante: ", estudante: estudanteData });
      }catch (error) {
        next(error)
    }
  }

  static async updateEstudante(req,res,next) {
    const { id_estudante } = req.params;
    const { nome,email,telefone,data_criacao,status,numero_aluno,fk_id_turma } = req.body;
    if (!nome ||!email ||!telefone ||!data_criacao ||!status ||!numero_aluno ||!fk_id_turma ||!id_estudante) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    const estudanteData = { nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma };

    try {
      const updatedRows = await connect("estudante").where("id_estudante", id_estudante).update(estudanteData)
      if (updatedRows === 0) {
        return res.status(404).json({ error: "Estudante não encontrado!" });
      }
      return res.status(200).json({ message: "Estudante atualizado: ", id_estudante });
    }catch (error) {
      next(error)
    }
  }
  static async deleteEstudante(req, res, next) {
    const{id_estudante } = req.params;
    if (!id_estudante) {
      return res.status(400).json({ error: "O ID do estudante deve ser fornecido!" });
    }
    try {
      const updatedRows = await connect("estudante").where("id_estudante", id_estudante).delete()
      if (updatedRows === 0) {
        return res.status(404).json({ error: "Estudante não encontrado!" });
      }
      return res.status(200).json({ message: "Estudante deletado com sucesso: ",id_estudante,});
    }catch (error) {
      next(error)
    }
  }
};
