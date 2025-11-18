const knex = require('knex');
const knexConfig = require('../../knexfile');

const knexNoDB = knex({
  client: knexConfig.client,
  connection: {
    host: knexConfig.connection.host,
    user: knexConfig.connection.user,
    password: knexConfig.connection.password,
    database: null,
  }
});

async function dropDatabaseIfExists() {
  try {
    const dbName = 'carometro';

    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length > 0) {
      //banco existe? se sim:
      await knexNoDB.raw(`DROP DATABASE ${dbName}`);
      console.log(`Banco de dados '${dbName}' deletado com sucesso!`);
    } else {
      console.log(`O banco de dados '${dbName}' não existe.`);
    }
  } catch (error) {
    console.error("Erro ao deletar o banco de dados:", error);
  } finally {
    await knexNoDB.destroy();//fecha conexao
  }
}

async function rollbackMigrations() {
  const knexWithDB = knex(knexConfig);

  try {
    console.log('Revertendo todas as migrações...');
    await knexWithDB.migrate.rollback(); //reverte migrações
    console.log('Todas as migrações revertidas com sucesso!');
  } catch (error) {
    console.error('Erro ao reverter as migrações:', error);
  } finally {
    await knexWithDB.destroy();//fecha conexao
  }
}

async function main() {
  await rollbackMigrations();

  await dropDatabaseIfExists();
}

main();
