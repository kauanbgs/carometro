exports.up = function (knex) {
  return knex.raw(`
            CREATE VIEW vw_gerenciar_turmas AS
SELECT
  t.nome AS nome_turma,
  d.nome AS nome_docente,
  d.id_docente AS id_docente
FROM turma t
JOIN docente d ON d.id_docente = t.fk_id_docente;
        `);
};

exports.down = function (knex) {
  return knex.schema.dropViewIfExists("vw_gerenciar_turmas");
};
