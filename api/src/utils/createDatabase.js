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

async function createDatabaseIfNotExists() {
  try {
    const dbName = 'sigo';

    //db exists?
    const result = await knexNoDB.raw(`SHOW DATABASES LIKE '${dbName}'`);
    if (result[0].length === 0) {
      //if here, db doesn't exist
      await knexNoDB.raw(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created successfully!`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await knexNoDB.destroy();//close db connection
  }
}

async function runMigrations() {
  await createDatabaseIfNotExists();//if db doesn't exist, it creates it
  const knexWithDB = knex(knexConfig);

  try {
    console.log('Running migrations...');
    await knexWithDB.migrate.latest();//run migrations
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await knexWithDB.destroy();//close db connection
  }
}

runMigrations();
