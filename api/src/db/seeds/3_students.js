/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
//Deleta todas as instancias existentes
  await knex('student').del()
  await knex('student').insert([
    { name: 'Aluanan Angel de Sousa', email: 'aluanan.sousa@aluno.senai.br', phone: '11900000001', create_date: '2025-01-01 08:00:00', status: 1, student_number: 1, fk_id_class: 1 },
    { name: 'Ana Carolina de Oliveira Monteiro', email: 'ana.monteiro@aluno.senai.br', phone: '11900000002', create_date: '2025-01-01 08:00:00', status: 1, student_number: 2, fk_id_class: 1 },
    { name: 'Anna Vitória Martins Ramos', email: 'anna.ramos@aluno.senai.br', phone: '11900000003', create_date: '2025-01-01 08:00:00', status: 1, student_number: 3, fk_id_class: 1 },
    { name: 'Arthur Cintra de Lacerda', email: 'arthur.lacerda@aluno.senai.br', phone: '11900000004', create_date: '2025-01-01 08:00:00', status: 1, student_number: 4, fk_id_class: 1 },
    { name: 'Arthur Cintra Faleiros', email: 'arthur.faleiros@aluno.senai.br', phone: '11900000005', create_date: '2025-01-01 08:00:00', status: 1, student_number: 5, fk_id_class: 1 },
    { name: 'Arthur Marques Santos', email: 'arthur.santos@aluno.senai.br', phone: '11900000006', create_date: '2025-01-01 08:00:00', status: 1, student_number: 6, fk_id_class: 1 },
    { name: 'Bryan Miguel Moreira', email: 'bryan.moreira@aluno.senai.br', phone: '11900000007', create_date: '2025-01-01 08:00:00', status: 1, student_number: 7, fk_id_class: 1 },
    { name: 'Davi Azevedo Gonçalves', email: 'davi.goncalves@aluno.senai.br', phone: '11900000008', create_date: '2025-01-01 08:00:00', status: 1, student_number: 8, fk_id_class: 1 },
    { name: 'Eduardo Augusto Tognati', email: 'eduardo.tognati@aluno.senai.br', phone: '11900000009', create_date: '2025-01-01 08:00:00', status: 1, student_number: 9, fk_id_class: 1 },
    { name: 'Flávio Henrique de Souza Filho', email: 'flavio.souza@aluno.senai.br', phone: '11900000010', create_date: '2025-01-01 08:00:00', status: 1, student_number: 10, fk_id_class: 1 },
    { name: 'Gabriel Braz Menezes', email: 'gabriel.menezes@aluno.senai.br', phone: '11900000011', create_date: '2025-01-01 08:00:00', status: 1, student_number: 11, fk_id_class: 1 },
    { name: 'Gabriel Rossi Ventura', email: 'gabriel.ventura@aluno.senai.br', phone: '11900000012', create_date: '2025-01-01 08:00:00', status: 1, student_number: 12, fk_id_class: 1 },
    { name: 'Guilherme Bason Garcia Neves', email: 'guilherme.neves@aluno.senai.br', phone: '11900000013', create_date: '2025-01-01 08:00:00', status: 1, student_number: 13, fk_id_class: 1 },
    { name: 'João Victor Oliveira Silva', email: 'joao.silva@aluno.senai.br', phone: '11900000014', create_date: '2025-01-01 08:00:00', status: 1, student_number: 14, fk_id_class: 1 },
    { name: 'José Victor Faccirolli', email: 'jose.faccirolli@aluno.senai.br', phone: '11900000015', create_date: '2025-01-01 08:00:00', status: 1, student_number: 15, fk_id_class: 1 },
    { name: 'Kauan Borges Plaza', email: 'kauan.plaza@aluno.senai.br', phone: '11900000016', create_date: '2025-01-01 08:00:00', status: 1, student_number: 16, fk_id_class: 1 },
    { name: 'Kauan Henrique Melo Silva', email: 'kauan.silva@aluno.senai.br', phone: '11900000017', create_date: '2025-01-01 08:00:00', status: 1, student_number: 17, fk_id_class: 1 },
    { name: 'Keliyah Cristine de Oliveira Martins', email: 'keliyah.martins@aluno.senai.br', phone: '11900000018', create_date: '2025-01-01 08:00:00', status: 1, student_number: 18, fk_id_class: 1 },
    { name: 'Leonardo Alves da Silva', email: 'leonardo.silva@aluno.senai.br', phone: '11900000019', create_date: '2025-01-01 08:00:00', status: 1, student_number: 19, fk_id_class: 1 },
    { name: 'Luís Pedro França Paulino', email: 'luis.paulino@aluno.senai.br', phone: '11900000020', create_date: '2025-01-01 08:00:00', status: 1, student_number: 20, fk_id_class: 1 },
    { name: 'Luiz Felipe Campos Margato', email: 'luiz.margato@aluno.senai.br', phone: '11900000021', create_date: '2025-01-01 08:00:00', status: 1, student_number: 21, fk_id_class: 1 },
    { name: 'Pedro Galindo Tavares', email: 'pedro.tavares@aluno.senai.br', phone: '11900000023', create_date: '2025-01-01 08:00:00', status: 1, student_number: 23, fk_id_class: 1 },
    { name: 'Rafael Caíres dos Santos', email: 'rafael.santos@aluno.senai.br', phone: '11900000024', create_date: '2025-01-01 08:00:00', status: 1, student_number: 24, fk_id_class: 1 },
    { name: 'Rafael Mendes Neves', email: 'rafael.neves@aluno.senai.br', phone: '11900000025', create_date: '2025-01-01 08:00:00', status: 1, student_number: 25, fk_id_class: 1 },
    { name: 'Renan Vieira Mobrise', email: 'renan.mobrise@aluno.senai.br', phone: '11900000026', create_date: '2025-01-01 08:00:00', status: 1, student_number: 26, fk_id_class: 1 },
    { name: 'Sofia Siqueira Belchior', email: 'sofia.belchior@aluno.senai.br', phone: '11900000027', create_date: '2025-01-01 08:00:00', status: 1, student_number: 27, fk_id_class: 1 },
    { name: 'Sophia de Oliveira Ferreira', email: 'sophia.ferreira@aluno.senai.br', phone: '11900000028', create_date: '2025-01-01 08:00:00', status: 1, student_number: 28, fk_id_class: 1 },
    { name: 'Ulisses Santini Gomes', email: 'ulisses.gomes@aluno.senai.br', phone: '11900000029', create_date: '2025-01-01 08:00:00', status: 1, student_number: 29, fk_id_class: 1 },
    { name: 'Vinicius Soares Peroni', email: 'vinicius.peroni@aluno.senai.br', phone: '11900000030', create_date: '2025-01-01 08:00:00', status: 1, student_number: 30, fk_id_class: 1 },
    { name: 'Antonio', email: 'acintra504@gmail.com', phone: '11900000031', create_date: '2025-01-01 08:00:00', status: 0, student_number: 31, fk_id_class: 1 }
  ]);
};
