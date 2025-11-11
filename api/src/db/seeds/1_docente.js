/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('docente').del()
  await knex('docente').insert([
    {nome: "Euller Ferreira", email: "euller@gmail.com", senha: "123456", tipo: "adm"},
    {nome: "Adriano Donisete", email: "adriano@gmail.com", senha: "123456", tipo: "adm"}
  ]);
};