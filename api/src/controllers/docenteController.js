let docentes = [];
const connect = require("../db/connect");

module.exports = class docenteController {
    static async createDocente(req, res) {
        const { email, senha, nome } = req.body;
        if(!email || !senha || !nome) {
            return res.status(400).json({error: "Todos os campos devem ser preenchidos"});
        }
        const existingDocente = docentes.find((docente) => docente.email === email)
        if (existingDocente) {
            return res.status(400).json({error: "Email já cadastrado"})
        }

        const query = `INSERT INTO docente (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');`

        // Executar a query INSERT
        connect.query(query, function(err) {
            if(err){
                console.log(err);
                return res.status(500).json({error: "Docente não cadastrado no banco de dados"})
            }
            console.log("Inserido no MySQL");
            res.status(201).json({message: "Docente criado com sucesso!"})
        })
    }
    static async readDocente(req, res) {
        const { nome, email, senha } = req.body
        const query = `SELECT * FROM docentes;`
        connect.query(query, function(err){
            if(err){
              console.log(err)
              return res.status(500).json({error: "ERRO"})
            }
            console.log("CERTO")
            res.status(201).json({message: "Usuarios: ", resp: connect.query})
          });
    }
}