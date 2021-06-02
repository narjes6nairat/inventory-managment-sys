//require for mysql2
var mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host:         'localhost',
  user:              'root',
  database:          'inventory_db',
  password:          '2021',
  waitForConnections:  true,
  connectionLimit: 10
});

module.exports = pool;
