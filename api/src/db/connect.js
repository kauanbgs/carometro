
const knex = require('knex')

const pool = knex({
  client: 'mysql2',
  connection: {
      host : 'localhost',
      user : 'alunods',
      password : 'senai@604',
      database : 'carometro'
   }
});
module.exports = pool