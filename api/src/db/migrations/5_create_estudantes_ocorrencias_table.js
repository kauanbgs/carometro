exports.up = function(knex) {
    return knex.schema.createTable('estudantes_ocorrencias', (table) => {
      table.increments('id_estudantes_ocorrencias').primary();
      table.integer('fk_id_ocorrencia').unsigned().notNullable();
      table.integer('fk_id_estudante').unsigned().notNullable();
      table.foreign('fk_id_ocorrencia').references('id_ocorrencia').inTable('ocorrencia');
      table.foreign('fk_id_estudante').references('id_estudante').inTable('estudante');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('estudantes_ocorrencias');
  };
  