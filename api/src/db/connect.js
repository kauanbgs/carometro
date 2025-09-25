//npm i mysql2

const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10, // Limite de conexões que suporta (10 conexões simultaneas)
  host: "localhost", //Minha máquina (local) -> IP DE ONDE ESTÁ O BCD
  user: 'alunods', //Usuário do MySQL
  password: 'senai@604', //Senha do MySQL
  database: 'vio' // Mude para o seu database criado la no Shell/Workbench
});

module.exports = pool;