let docentes = [];
const connect = require("../db/connect");

module.exports = class docenteController {
    static async createDocente(req, res) {
        const { email, password, name } = name.body;
        if(!email || !password || !name) {
            return res.status(400).json({error: "Todos os campos devem ser preenchidos"});
        }
        const existingDocente = docentes.find((docente) => docente.email === email)
        if (existingDocente) {
            return res.status(400).json({error: "Email já cadastrado"})
        }
        const newDocente = { email, password, name};
        docentes.push(newDocente);

        const query = `INSERT INTO docentes (email, password, name) VALUES(
        '${email}', '${password}', '${name}')`;

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
}