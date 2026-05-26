exports.up = function(knex) {
    return knex.schema.createTable('student', (table) => {
      table.increments('id_student').primary();
      table.string('name', 100).notNullable();
      table.string('email', 150).unique().nullable();
      table.string('phone', 11).nullable();
      table.timestamp('create_date').defaultTo(knex.fn.now()) ;
      table.boolean('status').defaultTo(1).notNullable();
      table.integer('student_number').nullable();
      table.specificType('photo', 'LONGBLOB').nullable();
      table.integer('fk_id_class').unsigned().notNullable();
      table.foreign('fk_id_class').references('id_class').inTable('class').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('student');
  };
  