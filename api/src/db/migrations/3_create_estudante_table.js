exports.up = function(knex) {
    return knex.schema.createTable('estudante', (table) => {
      table.increments('id_estudante').primary();
      table.string('nome', 100).notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('telefone', 11).notNullable();
      table.timestamp('data_criacao').notNullable();
      table.boolean('status').notNullable();
      table.integer('numero_aluno').notNullable();
      table.integer('fk_id_turma').unsigned().notNullable();
      table.foreign('fk_id_turma').references('id_turma').inTable('turma');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('estudante');
  };
  