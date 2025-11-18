const knex = require('knex');
const knexConfig = require('../../knexfile');

// Criação de um pool de conexões sem especificar o banco de dados
const knexNoDB = knex({
  client: knexConfig.client,
  connection: {
    host: knexConfig.connection.host,
    user: knexConfig.connection.user,
    password: knexConfig.connection.password,
    database: null,
  }
});

async function createDatabaseIfNotExists() {
  try {
    const dbName = 'carometro';

    //banco existe?
    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length === 0) {
      //se entrou aqui nao existe
      await knexNoDB.raw(`CREATE DATABASE ${dbName}`);
      console.log(`Banco de dados '${dbName}' criado com sucesso!`);
    } else {
      console.log(`O banco de dados '${dbName}' já existe.`);
    }
  } catch (error) {
    console.error("Erro ao verificar ou criar o banco de dados:", error);
  } finally {
    await knexNoDB.destroy();//fecha conexao com o banco
  }
}

async function runMigrations() {
  await createDatabaseIfNotExists();//se nao tem banco, ele cria
  const knexWithDB = knex(knexConfig);

  try {
    console.log('Rodando migrações...');
    await knexWithDB.migrate.latest();//roda migrações
    console.log('Migrações aplicadas com sucesso!');
  } catch (error) {
    console.error('Erro ao rodar as migrações:', error);
  } finally {
    await knexWithDB.destroy();//fecha conexao
  }
}

runMigrations();
