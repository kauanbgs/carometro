//NAO USAR PRETTIER



const knexConfig = require("../../knexfile");  // Carrega a configuração
const knex = require('knex');  // Importa o Knex
const connect = knex(knexConfig);  // Cria a instância do Knex
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = class docenteController {
  static async createDocente(req, res, next) {
    let { email, senha, nome, tipo } = req.body;
    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    senha = await bcrypt.hash(senha, SALT_ROUNDS);

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
    let { senha, nome, tipo } = req.body;
    if (!senha || !nome || !id_docente) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    senha = await bcrypt.hash(senha, SALT_ROUNDS);
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
    const { email } = req.params
    try {
      const deletedCount = await connect('docente').where({email}).del()
      if (deletedCount == 0){
        return res.status(404).json({ error: "Usuario não encontrado!"})
      }
      return res.status(200).json({ message: `Usuario excluido: ${email}`})
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(400).json({
        error: "Não é possível excluir o docente: ele está vinculado a uma ou mais turmas."
      })
    }
    next(error)
   }
  }

  static async login(req, res, next){
    const {email, senha} = req.body;

    if(!email || !senha){
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    try {
      const docenteLogado = await connect("docente").select("*").where("email", "=", email) 
      if (docenteLogado.length === 0) {
          return res.status(401).json({ error: "Docente não cadastrado" });
        }

      const docente = docenteLogado[0];
      const senhaCorreta = await bcrypt.compare(senha, docente.senha);
      if(!senhaCorreta){
        return res.status(401).json({error: "Senha incorreta"})
      }
      return res.status(200).json({ message: "Login bem-sucedido", docenteLogado });
    } catch (error) {
      next(error);
    }
  }
};
