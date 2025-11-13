exports.up = function(knex) {
    return knex.schema.createTable('ocorrencia', (table) => {
      table.increments('id_ocorrencia').primary();
      table.string('tipo', 100).notNullable();
      table.string('descricao', 150).notNullable();
      table.timestamp('data_criacao').defaultTo(knex.fn.now()).notNullable();
      table.integer('fk_id_estudante').unsigned().notNullable();
      table.foreign('fk_id_estudante').references('id_estudante').inTable('estudante');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ocorrencia');
  };
  