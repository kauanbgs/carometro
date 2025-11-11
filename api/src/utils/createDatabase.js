const knex = require('knex');
const knexConfig = require('../../knexfile'); // Importa o knexfile

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

// Função para verificar se o banco existe, e se não, criá-lo
async function createDatabaseIfNotExists() {
  try {
    const dbName = 'carometro';

    // Verificar se o banco existe
    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length === 0) {
      // Banco de dados não existe, vamos criar
      await knexNoDB.raw(`CREATE DATABASE ${dbName}`);
      console.log(`Banco de dados '${dbName}' criado com sucesso!`);
    } else {
      console.log(`O banco de dados '${dbName}' já existe.`);
    }
  } catch (error) {
    console.error("Erro ao verificar ou criar o banco de dados:", error);
  } finally {
    await knexNoDB.destroy(); // Fechar a conexão sem banco
  }
}

// Função para rodar as migrações
async function runMigrations() {
  await createDatabaseIfNotExists(); // Criar o banco caso não exista
  const knexWithDB = knex(knexConfig); // Agora, conecte-se com o banco real

  try {
    console.log('Rodando migrações...');
    await knexWithDB.migrate.latest(); // Rodar as migrações
    console.log('Migrações aplicadas com sucesso!');
  } catch (error) {
    console.error('Erro ao rodar as migrações:', error);
  } finally {
    await knexWithDB.destroy(); // Fechar a conexão com o banco
  }
}

// Rodar as migrações ao executar o script
runMigrations();
