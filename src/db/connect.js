const mysql = require('mysql2');

const { DB_IP, DB_USER, DB_PASSWORD, DB_NAME } = require('../../config/env');

const pool = mysql.createPool({
  host: DB_IP,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// pool.connect(err => {
//   if (err) {
//     console.log('Error connecting to DB.');
//     throw err;
//   }

//   console.log('MySQL connected successfully');
// });

module.exports = pool.promise();
