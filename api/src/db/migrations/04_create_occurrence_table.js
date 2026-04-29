exports.up = function(knex) {
    return knex.schema.createTable('occurrence', (table) => {
      table.increments('id_occurrence').primary();
      table.string('type', 100).notNullable();
      table.string('description', 150).notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now()).notNullable();
      table.integer('fk_id_student').unsigned().notNullable();
      table.foreign('fk_id_student').references('id_student').inTable('student').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('occurrence');
  };
  