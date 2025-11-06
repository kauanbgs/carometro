exports.up = function(knex) {
    return knex.schema.createTable('docente', (table) => {
      table.increments('id_docente').primary();
      table.string('nome', 100).notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('senha', 100).notNullable();
      table.enu('tipo', ['adm', 'doc']).defaultTo('doc');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('docente');
  };