// knexfile.js
module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'master',
    database: 'carometro',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};
