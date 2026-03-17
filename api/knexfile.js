// knexfile.js
module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'aluno',
    password: 'senai@604',
    database: 'sigo',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};
