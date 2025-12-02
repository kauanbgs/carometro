const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10, // Limite de conexões que suporta (10 conexões simultaneas)
  // 10.89.240.79 -> IP DO KAUANBGS :)
  host: "localhost", //Minha máquina (local) -> IP DE ONDE ESTÁ O BCD
  user: 'alunods', //Usuário do MySQL
  password: 'senai@604', //Senha do MySQL
  database: 'carometro' //Mude para o seu database criado la no Shell/Workbench

});

module.exports = pool;