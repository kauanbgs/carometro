const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: 'root',
  password: 'master',
  database: 'sigo'
});

module.exports = pool;