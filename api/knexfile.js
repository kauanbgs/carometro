// knexfile.js
module.exports = {
  client: 'mysql2', // ou 'mysql', dependendo do seu banco
  connection: {
    host: 'localhost',
    user: 'alunods',
    password: 'senai@604',
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
