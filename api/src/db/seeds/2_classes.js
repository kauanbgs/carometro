/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
//Deleta todas as instancias existentes
  await knex('class').del()
  await knex('class').insert([
    {name: "1C - DS", fk_id_instructor: 1},
    {name: "Eletrônica", fk_id_instructor: 1}
  ]);
};
