/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
//Deleta todas as instancias existentes
  await knex('estudante').del()
  await knex('estudante').insert([
    { nome: 'Aluanan Angel de Sousa', email: 'aluanan.sousa@aluno.senai.br', telefone: '11900000001', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 1, fk_id_turma: 1 },
    { nome: 'Ana Carolina de Oliveira Monteiro', email: 'ana.monteiro@aluno.senai.br', telefone: '11900000002', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 2, fk_id_turma: 1 },
    { nome: 'Anna Vitória Martins Ramos', email: 'anna.ramos@aluno.senai.br', telefone: '11900000003', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 3, fk_id_turma: 1 },
    { nome: 'Arthur Cintra de Lacerda', email: 'arthur.lacerda@aluno.senai.br', telefone: '11900000004', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 4, fk_id_turma: 1 },
    { nome: 'Arthur Cintra Faleiros', email: 'arthur.faleiros@aluno.senai.br', telefone: '11900000005', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 5, fk_id_turma: 1 },
    { nome: 'Arthur Marques Santos', email: 'arthur.santos@aluno.senai.br', telefone: '11900000006', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 6, fk_id_turma: 1 },
    { nome: 'Bryan Miguel Moreira', email: 'bryan.moreira@aluno.senai.br', telefone: '11900000007', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 7, fk_id_turma: 1 },
    { nome: 'Davi Azevedo Gonçalves', email: 'davi.goncalves@aluno.senai.br', telefone: '11900000008', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 8, fk_id_turma: 1 },
    { nome: 'Eduardo Augusto Tognati', email: 'eduardo.tognati@aluno.senai.br', telefone: '11900000009', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 9, fk_id_turma: 1 },
    { nome: 'Flávio Henrique de Souza Filho', email: 'flavio.souza@aluno.senai.br', telefone: '11900000010', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 10, fk_id_turma: 1 },
    { nome: 'Gabriel Braz Menezes', email: 'gabriel.menezes@aluno.senai.br', telefone: '11900000011', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 11, fk_id_turma: 1 },
    { nome: 'Gabriel Rossi Ventura', email: 'gabriel.ventura@aluno.senai.br', telefone: '11900000012', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 12, fk_id_turma: 1 },
    { nome: 'Guilherme Bason Garcia Neves', email: 'guilherme.neves@aluno.senai.br', telefone: '11900000013', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 13, fk_id_turma: 1 },
    { nome: 'João Victor Oliveira Silva', email: 'joao.silva@aluno.senai.br', telefone: '11900000014', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 14, fk_id_turma: 1 },
    { nome: 'José Victor Faccirolli', email: 'jose.faccirolli@aluno.senai.br', telefone: '11900000015', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 15, fk_id_turma: 1 },
    { nome: 'Kauan Borges Plaza', email: 'kauan.plaza@aluno.senai.br', telefone: '11900000016', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 16, fk_id_turma: 1 },
    { nome: 'Kauan Henrique Melo Silva', email: 'kauan.silva@aluno.senai.br', telefone: '11900000017', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 17, fk_id_turma: 1 },
    { nome: 'Keliyah Cristine de Oliveira Martins', email: 'keliyah.martins@aluno.senai.br', telefone: '11900000018', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 18, fk_id_turma: 1 },
    { nome: 'Leonardo Alves da Silva', email: 'leonardo.silva@aluno.senai.br', telefone: '11900000019', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 19, fk_id_turma: 1 },
    { nome: 'Luís Pedro França Paulino', email: 'luis.paulino@aluno.senai.br', telefone: '11900000020', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 20, fk_id_turma: 1 },
    { nome: 'Luiz Felipe Campos Margato', email: 'luiz.margato@aluno.senai.br', telefone: '11900000021', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 21, fk_id_turma: 1 },
    { nome: 'Maria Vitória Sampaio Souza', email: 'maria.souza@aluno.senai.br', telefone: '11900000022', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 22, fk_id_turma: 1 },
    { nome: 'Pedro Galindo Tavares', email: 'pedro.tavares@aluno.senai.br', telefone: '11900000023', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 23, fk_id_turma: 1 },
    { nome: 'Rafael Caíres dos Santos', email: 'rafael.santos@aluno.senai.br', telefone: '11900000024', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 24, fk_id_turma: 1 },
    { nome: 'Rafael Mendes Neves', email: 'rafael.neves@aluno.senai.br', telefone: '11900000025', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 25, fk_id_turma: 1 },
    { nome: 'Renan Vieira Mobrise', email: 'renan.mobrise@aluno.senai.br', telefone: '11900000026', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 26, fk_id_turma: 1 },
    { nome: 'Sofia Siqueira Belchior', email: 'sofia.belchior@aluno.senai.br', telefone: '11900000027', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 27, fk_id_turma: 1 },
    { nome: 'Sophia de Oliveira Ferreira', email: 'sophia.ferreira@aluno.senai.br', telefone: '11900000028', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 28, fk_id_turma: 1 },
    { nome: 'Ulisses Santini Gomes', email: 'ulisses.gomes@aluno.senai.br', telefone: '11900000029', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 29, fk_id_turma: 1 },
    { nome: 'Vinicius Soares Peroni', email: 'vinicius.peroni@aluno.senai.br', telefone: '11900000030', data_criacao: '2025-01-01 08:00:00', status: 1, numero_aluno: 30, fk_id_turma: 1 },
    { nome: 'Antonio', email: 'acintra504@gmail.com', telefone: '11900000031', data_criacao: '2025-01-01 08:00:00', status: 0, numero_aluno: 31, fk_id_turma: 1 }
  ]);
};
