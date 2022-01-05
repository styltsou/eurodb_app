const mysql = require('mysql');

const { DB_IP, DB_USER, DB_PASSWORD, DB_NAME } = require('../../config/env');

const db = mysql.createConnection({
  host: DB_IP,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected successfully');
});

module.exports = db;
