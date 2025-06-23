require('dotenv').config()
const { Pool } = require('pg');
const localDb = process.env.LOCAL_DB;
const remoteDb = process.env.REMOTE_DB;

module.exports = new Pool({
  connectionString: remoteDb
})
