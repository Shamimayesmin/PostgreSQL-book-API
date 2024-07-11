
const { Pool } = require('pg');
 
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: "1234",
  port: 5432,
  database:"bookdb"
 
})

module.exports = pool;