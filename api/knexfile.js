// knexfile.js
module.exports = {
  client: 'mysql2',
  connection: {
    host: '10.89.240.43',
    user: 'aluno',
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
