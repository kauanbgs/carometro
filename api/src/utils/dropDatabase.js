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
    const dbName = 'sigo';

    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length > 0) {
      //db exists? if yes:
      await knexNoDB.raw(`DROP DATABASE ${dbName}`);
      console.log(`Database '${dbName}' deleted successfully!`);
    } else {
      console.log(`Database '${dbName}' doesn't exist.`);
    }
  } catch (error) {
    console.error("Error deleting database:", error);
  } finally {
    await knexNoDB.destroy();//close db connection
  }
}

async function rollbackMigrations() {
  const knexWithDB = knex(knexConfig);

  try {
    console.log('Reverting migrations...');
    await knexWithDB.migrate.rollback(); //revert migrations
    console.log('All migrations reverted successfully!');
  } catch (error) {
    console.error('Error reverting migrations:', error);
  } finally {
    await knexWithDB.destroy();//close db connection
  }
}

async function main() {
  await rollbackMigrations();

  await dropDatabaseIfExists();
}

main();
