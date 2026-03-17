exports.up = function(knex) {
    return knex.schema.createTable('students_occurrence', (table) => {
      table.increments('id_students_occurrence').primary();
      table.integer('fk_id_occurrence').unsigned().notNullable();
      table.integer('fk_id_student').unsigned().notNullable();
      table.foreign('fk_id_occurrence').references('id_occurrence').inTable('occurrence');
      table.foreign('fk_id_student').references('id_student').inTable('student');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students_occurrence');
  };
  