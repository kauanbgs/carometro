//NAO USAR PRETTIER




const knexConfig = require("../db/knexfile");  // Carrega a configuração
const knex = require('knex');  // Importa o Knex
const connect = knex(knexConfig);  // Cria a instância do Knex

module.exports = class docenteController {
  static async createDocente(req, res, next) {
    const { email, senha, nome, tipo } = req.body;
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    try {
      const docenteData = { email, senha, nome}
      if(tipo){
        docenteData.tipo = tipo
      }
      await connect("docente").insert(docenteData)
      return res.status(201).json({ message: "Docente criado com sucesso!"})
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: "Email já cadastrado. Tente outro." });
      }
      next(error)
    }
  }

  static async readDocente(req, res, next) {
    try {
      const docentes = await connect('docente').select("*")

      if (docentes.length === 0) {
        return res.status(404).json({ error: 'Nenhum docente encontrado!' });
      }
      return res.status(200).json(docentes);
    } catch (error) {
      next(error)
    }
  }

  static async getDocenteById(req, res, next) {
    const { id_docente } = req.params;
    try {
      const docente = await connect("docente").where('id_docente', id_docente)
      if (docente.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }
      return res.status(200).json(docente)
    } catch (error) {
      next(error)
    }
  }

  static async getDocenteByName(req, res, next) {
    const { nome } = req.params;
    try {
      const docente = await connect("docente").where("nome", "like", `%${nome}%`)
      return res.status(200).json({docente})
    } catch (error) {
      next(error)
    }
  }

  static async updateDocente(req, res, next) {
    const { id_docente } = req.params
    const { senha, nome, tipo } = req.body;
    if (!senha || !nome || !id_docente) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    try {
      const docenteData = { senha, nome}
      if(tipo){
        docenteData.tipo = tipo
      }
      const updatedRows = await connect("docente").where("id_docente", id_docente).update(docenteData)
      if (updatedRows == 0 ) {
        return res.status(404).json({error: "Docente nao encontrado!"})
      }
      return res.status(200).json({ message: "Docente atualizado com sucesso!" });
    } catch (error) {
      next(error)
    }
  }
  static async deleteDocente(req, res, next) {
    const { id_docente } = req.params
    try {
      const deletedCount = await connect('docente').where({id_docente}).del()
      if (deletedCount == 0){
        return res.status(404).json({ error: "Usuario não encontrado!"})
      }
      return res.status(200).json({ message: `Usuario excluido: ${id_docente}`})
    } catch (error) {
      next(error)
    }
  }
};
