//NAO USAR PRETTIER

const connect = require("../db/connect");

module.exports = class turmaController {

  static async createTurma(req,res,next){
    const { nome, fk_id_docente } = req.body;
    if (!nome || !fk_id_docente) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    const turmaData = { nome, fk_id_docente }
    try {
      await connect("turma").insert(turmaData)
    } catch (error) {
      if(error.code === "ER_DUP_ENTRY") {
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
      next(error)
    }
  }

  static async GetTurmaByDocenteID(req, res, next) {
    const { fk_id_docente } = req.params;
    if (!fk_id_docente) {
      return res.status(400).json({ error: "ID do docente é obrigatório!" });
    }
    try {
        const turmaData = await connect("turma").select("*").where("fk_id_docente", "=", fk_id_docente)
        if (turmaData.length === 0) {
          return res.status(404).json({ message: "Nenhuma turma encontrada para este docente." });
        }
        return res.status(200).json({ message: "Turmas encontradas:",turmas: turmaData })
      } catch (error) {
          next(error)
        };
      };

  static async GetTurmaByName(req, res, next) {
    const { nome } = req.params;
    try {
      const turmaData = await connect("turma").select("*").where("nome", "LIKE", `%${nome}%`)
      if (turmaData.length === 0) {
        return res.status(404).json({ message: "Nenhuma turma encontrada com este nome." });
      }
      return res.status(200).json({message: "Turmas encontradas:",turmas: turmaData,})
    } catch (error) {
      next(error)
    }
  }

  static async updateTurma(req, res, next) {
    const { nome } = req.body;
    const { id_turma } = req.params

    if ( !nome ) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    try {
      const updatedRows = await connect("turma").where("id_turma", id_turma).update({ nome })
      if (updatedRows === 0) {
          return res.status(404).json({ error: "Turma não encontrada!" });
        }
        return res.status(200).json({ message: "Turma atualizada com sucesso!", id_turma });
      } catch (error) {
        next(error)
      }
    }

  static async deleteTurma(req, res) {
    const id_turma = req.params.id_turma;
    if (!id_turma) {
      return res.status(400).json({ error: "O ID da turma deve ser fornecido!" });
    }
    try {
      const updatedRows = await connect("turma").where("id_turma", id_turma).del()
          if (updatedRows === 0) {
            return res.status(404).json({ error: "Turma não encontrada!" });
          }
          return res.status(200).json({message: "Turma deletada com sucesso: ", id_turma});
        } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno no servidor!" });
    }
  }
}