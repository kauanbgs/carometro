exports.up = function(knex) {
    return knex.schema.createTable('log_ocorrencias', (table) => {
      table.increments('id_log_ocorrencia').primary();
      table.timestamp('data_log').notNullable();
      table.integer('fk_id_ocorrencia').unsigned().notNullable();
      table.integer('fk_id_docente').unsigned().notNullable();
      table.foreign('fk_id_ocorrencia').references('id_ocorrencia').inTable('ocorrencia');
      table.foreign('fk_id_docente').references('id_docente').inTable('docente');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('log_ocorrencias');
  };
  