const connect = require('../db/connect');

module.exports = class estudanteController {
    static async createEstudante(req, res) {
        const { nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma } = req.body;

        if (!nome || !email || !telefone || !data_criacao || !status || !numero_aluno || !fk_id_turma) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        }

        const query = `
            INSERT INTO estudante (nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma];

        connect.query(query, values, function (err, results) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Estudante já cadastrado no sistema!" });
                } else {
                    console.log(err);
                    return res.status(500).json({ error: "Erro interno no servidor... Estudante não foi cadastrado!" });
                }
            }

            return res.status(201).json({ message: "Estudante cadastrado com sucesso!" });
        });
    }

    static async readEstudante(req, res) {
        const query = `SELECT * FROM estudante`;

        try {
            connect.query(query, function (err, results) {
                if (err) {
                    res.status(500).json({ error: "Erro interno no servidor!" });
                }

                return res.status(200).json({
                    message: "Obtendo estudantes:",
                    alunos: results
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }
    static async updateEstudante(req, res) {
        const { id_estudante, nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma } = req.body;
        if(!id_estudante || !nome || !email || !telefone || !data_criacao || !status || !numero_aluno || !fk_id_turma){
            return res.status(400). json({error: "Todos os campos devem ser preenchidos"});
        }

        const query = `
            UPDATE estudante SET nome=?, email=?, telefone=?, data_criacao=?, status=?, numero_aluno=?, fk_id_turma=?
            WHERE id_estudante=?
            `
        const value =[nome, email, telefone, data_criacao, status, numero_aluno, fk_id_turma, id_estudante];
        
        try {
            connect.query(query, value, function(err, results){
                if(err){
                    if(err.code === 'ER_DUP_ENTRY'){
                        return res.status(400).json({error: "Estudante já cadastrado no sistema!"});
                    }
                    else{
                        console.log(err);
                        return res.status(500).json({error: "Erro interno no servidor!"});
                    }
                }
                if(results.affectedRows === 0){
                    res.status(404).json({error: "Estudante não encontrado!"});
                }
                res.status(200).json({message: "Estudante atualizado com sucesso com o ID! ->", id: id_estudante});
            })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }
    static async deleteEstudante(req, res) {
        const identificador_id_estudante = req.params.id_estudante;
        const query = `DELETE FROM estudante WHERE id_estudante=?`;
        
        if(!id_estudante){
            return res.status(400).json({ error: "O ID do estudante deve ser fornecido!" });
        }
        try {
            connect.query(query, [identificador_id_estudante], function(err, results){
                if(err){
                    console.log(err);
                    return res.status(500).json({ error: "Erro interno no servidor! Aluno não foi deletado!"})
                }
                if(results.affectedRows === 0){
                    return res.status(404).json({ error: "Estudante não encontrado!"});
                }
                return res.status(200).json({ message: "Estudante deletado com sucesso: ", identificador_id_estudante});
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }
};