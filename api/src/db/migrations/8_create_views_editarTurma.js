exports.up = function (knex) {
  return knex.raw(`
            CREATE VIEW vw_editar_turma AS
SELECT
  e.nome AS nome_aluno,
  t.nome AS nome_turma,
  e.numero_aluno AS numero_chamada,
  e.status
FROM estudante e
JOIN turma t ON t.id_turma = e.fk_id_turma;
        `);
};

exports.down = function (knex) {
  return knex.schema.dropViewIfExists("vw_editar_turma");
};
