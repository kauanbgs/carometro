exports.up = function(knex) {
    return knex.schema.createTable('occurrence_log', (table) => {
      table.increments('id_occurrence_log').primary();
      table.timestamp('log_date').notNullable();
      table.integer('fk_id_occurrence').unsigned().notNullable();
      table.integer('fk_id_instructor').unsigned().notNullable();
      table.foreign('fk_id_occurrence').references('id_occurrence').inTable('occurrence').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('fk_id_instructor').references('id_instructor').inTable('instructor');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('occurrence_log');
  };