//NAO USAR PRETTIER
const knexConfig = require("../../knexfile");
const knex = require('knex');
const connect = knex(knexConfig); 

module.exports = class ocorrenciaController {
  static async createOcorrencia(req, res, next) {
  let { tipo, descricao, fk_id_estudante } = req.body;

  if (!tipo || !descricao || !fk_id_estudante) {
    return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
  }

  try {
    // CHAMANDO A PROCEDURE
    await connect.raw(`
      CALL criarOcorrencia(?, ?, ?)
    `, [tipo, descricao, fk_id_estudante]);

    return res.status(201).json({
      message: "Ocorrência criada com sucesso! (com procedure) "
    });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: "Ocorrência já cadastrada. Tente outro."
      });
    }
    next(error);
  }
}
  

  static async getOcorrenciaByIdAluno(req, res, next) {
    const { fk_id_estudante } = req.params;
    try {
      const ocorrencias = await connect("ocorrencia").where('fk_id_estudante', fk_id_estudante)
      if (ocorrencias.length === 0) {
        return res.status(404).json({ error: 'Nenhuma ocorrência registrada!' });
      }
      return res.status(200).json(ocorrencias)
    } catch (error) {
      next(error)
    }
  }

  static async readOcorrencias(req, res, next) {
    try {
      const ocorrencia = await connect('ocorrencia').select("*")
      if (ocorrencia.length === 0) {
        return res.status(404).json({ error: 'Nenhum docente encontrado!' });
      }
      return res.status(200).json(ocorrencia);
    } catch (error) {
      next(error)
    }
  }

  static async updateOcorrencia(req, res, next) {
      const { id_ocorrencia } = req.params
      let { tipo, descricao, fk_id_estudante } = req.body;
      if (!tipo || !descricao || !fk_id_estudante) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
      }
      const ocorrencia = { tipo, descricao, fk_id_estudante} = req.body;
      try {
        const updatedRows = await connect("ocorrencia").where("id_ocorrencia", id_ocorrencia).update(ocorrencia)
        if(updatedRows === 0){
          return res.status(404).json({error: "Ocorrência não encontrada!"});
        }
        return res.status(200).json({ message: "Ocorrência atualizada: ", id_ocorrencia });
      } catch (error) {
        next(error)
      }
    }

    static async deleteOcorrencia(req, res, next) {
      const { id_ocorrencia } = req.params
      try {
        const deletedOcorrencia = await connect('ocorrencia').where("id_ocorrencia", id_ocorrencia).del()
        if (deletedOcorrencia == 0){
          return res.status(404).json({ error: "Ocorrência não encontrada!"})
        }
        return res.status(200).json({ message: `Ocorrência excluida: ${id_ocorrencia}`})
      } catch (error) {
        next(error)
      }
    }
};
