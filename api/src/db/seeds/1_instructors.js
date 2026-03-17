/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
//Deleta todas as instancias existentes
  await knex('instructor').del()
  await knex('instructor').insert([
    {name: "Euller Ferreira", email: "euller@gmail.com", password: "123456", type: "adm"},
    {name: "Adriano Donisete", email: "adriano@gmail.com", password: "123456", type: "adm"}
  ]);
};