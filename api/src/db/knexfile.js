module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'alunods',
    password: 'senai@604',
    database: 'carometro', // Nome do banco de dados real
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations', // Caminho para as migrations
  },
  seeds: {
    directory: './src/db/seeds', // Caminho para seeds
  },
};
