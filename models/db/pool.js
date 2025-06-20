require('dotenv').config()
const { Pool } = require('pg');
const localDb = process.env.LOCAL_DB;

module.exports = new Pool({
  connectionString: localDb
})
