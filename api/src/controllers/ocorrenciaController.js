//NAO USAR PRETTIER



const knexConfig = require("../../knexfile");  // Carrega a configuração
const knex = require('knex');  // Importa o Knex
const connect = knex(knexConfig);  // Cria a instância do Knex

module.exports = class ocorrenciaController {
  static async createOcorrencia(req, res, next) {
    let { tipo, descricao, data_criacao, fk_id_estudante } = req.body;
    if (!tipo || !descricao || !data_criacao || !fk_id_estudante) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    try {
      const dadosOcorrencia = { tipo, descricao, data_criacao, fk_id_estudante };
      if(tipo){
        dadosOcorrencia.tipo = tipo
      }
      await connect("ocorrencia").insert(dadosOcorrencia)
      return res.status(201).json({ message: "Ocorrencia Criada com sucesso!"})
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: "Ocorrencia já cadastrada. Tente outro." });
      }
      next(error)
    }
  }

  static async getOcorrenciaByIdAluno(req, res, next) {
    const { fk_id_estudante } = req.params;
    try {
      const ocorrencias = await connect("ocorrencia").where('fk_  id_estudante', fk_id_estudante)
      if (ocorrencias.length === 0) {
        return res.status(404).json({ error: 'Nenhuma ocorrência registrada!' });
      }
      return res.status(200).json(ocorrencias)
    } catch (error) {
      next(error)
    }
  }

};
