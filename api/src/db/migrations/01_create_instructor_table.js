exports.up = function(knex) {
    return knex.schema.createTable('instructor', (table) => {
      table.increments('id_instructor').primary();
      table.string('name', 100).notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('password', 100).notNullable();
      table.enum('role', ['adm', 'inst']).defaultTo('inst');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('instructor');
  };