/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('turma').del()
  await knex('turma').insert([
    {nome: "1C - DS", fk_id_docente: 1}
  ]);
};
