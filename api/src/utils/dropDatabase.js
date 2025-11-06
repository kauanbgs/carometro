const knex = require('knex');
const knexConfig = require('../db/knexfile'); // Certifique-se de que o caminho está correto!

// Criação de um pool de conexões sem especificar o banco de dados
const knexNoDB = knex({
  client: knexConfig.client,
  connection: {
    host: knexConfig.connection.host,
    user: knexConfig.connection.user,
    password: knexConfig.connection.password,
    database: null, // Não especificamos o banco aqui, pois vamos criar
  }
});

// Função para remover o banco de dados
async function dropDatabaseIfExists() {
  try {
    const dbName = 'carometro';

    // Verificar se o banco existe
    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length > 0) {
      // Banco de dados existe, vamos deletá-lo
      await knexNoDB.raw(`DROP DATABASE ${dbName}`);
      console.log(`Banco de dados '${dbName}' deletado com sucesso!`);
    } else {
      console.log(`O banco de dados '${dbName}' não existe.`);
    }
  } catch (error) {
    console.error("Erro ao deletar o banco de dados:", error);
  } finally {
    await knexNoDB.destroy(); // Fechar a conexão
  }
}

// Função para reverter todas as migrations
async function rollbackMigrations() {
  const knexWithDB = knex(knexConfig); // Agora estamos usando as configurações do knexfile

  try {
    console.log('Revertendo todas as migrações...');
    await knexWithDB.migrate.rollback(); // Reverter as migrações
    console.log('Todas as migrações revertidas com sucesso!');
  } catch (error) {
    console.error('Erro ao reverter as migrações:', error);
  } finally {
    await knexWithDB.destroy(); // Fechar a conexão com o banco
  }
}

// Rodar a remoção do banco e rollback das migrações
async function main() {
  // Passo 1: Reverter as migrações
  await rollbackMigrations();

  // Passo 2: Deletar o banco de dados
  await dropDatabaseIfExists();
}

// Executar o script principal
main();
