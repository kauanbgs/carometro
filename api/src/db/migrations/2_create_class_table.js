exports.up = function(knex) {
    return knex.schema.createTable('class', (table) => {
      table.increments('id_class').primary();
      table.string('name', 100).notNullable();
      table.integer('fk_id_instructor').unsigned().notNullable();
      table.foreign('fk_id_instructor').references('id_instructor').inTable('instructor');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('class');
  };