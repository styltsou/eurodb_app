const mysql = require('mysql2');

const { DB_IP, DB_USER, DB_PASSWORD, DB_NAME } = require('../../config/env');

const pool = mysql.createPool({
  host: DB_IP,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

//NOTE: Find a way to check if connection was successful

module.exports = pool.promise();
