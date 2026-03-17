const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: 'aluno',
  password: 'senai@604',
  database: 'sigo'
});

module.exports = pool;