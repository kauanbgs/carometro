exports.up = function(knex) {
    return knex.schema.createTable('student', (table) => {
      table.increments('id_student').primary();
      table.string('name', 100).notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('phone', 11).notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now()).notNullable() ;
      table.boolean('status').defaultTo(1).notNullable();
      table.integer('student_number').notNullable();
      table.integer('fk_id_class').unsigned().notNullable();
      table.foreign('fk_id_class').references('id_class').inTable('class');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('student');
  };
  