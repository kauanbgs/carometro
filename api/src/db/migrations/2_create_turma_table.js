exports.up = function(knex) {
    return knex.schema.createTable('turma', (table) => {
      table.increments('id_turma').primary();
      table.string('nome', 100).notNullable();
      table.integer('fk_id_docente').unsigned().notNullable();
      table.foreign('fk_id_docente').references('id_docente').inTable('docente');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('turma');
  };