const pool = require('./pool');
const bcrypt = require('bcryptjs');

const resetDb = async () => {
  const SQL = `
  TRUNCATE TABLE users, messages
  RESTART IDENTITY;
  `
  await pool.query(SQL);
}

const createUser = async (input) => {
  const user = {...input, password: bcrypt.hashSync(input.password, 10)};
  if(user.isAdmin === undefined) {
    user.isAdmin = false;
  }
  const values = Object.values(user);
  const SQL = `
  INSERT INTO users
  (full_name, username, password,
  membership_status, isAdmin)
  VALUES
  ($1, $2, $3, $4, $5)
  `
  await pool.query(SQL, values);
}

const createMessage = async (message) => {
  const values = Object.values(message);
  const SQL = `
  INSERT INTO messages
  (title, time, text, user_id)
  VALUES
  ($1, $2, $3, $4)
  `
  await pool.query(SQL, values);
}

const getUser = async (userId, username) => {
  if(userId) {
    const SQL = `
    SELECT * FROM users
    WHERE id = $1;
    `
    const { rows } = await pool.query(SQL, [userId]);
    return rows[0];
  }
  const SQL = `
  SELECT * FROM users
  WHERE username = $1;
  `
  const { rows } = await pool.query(SQL, [username]);
  return rows[0];
}

module.exports = {
  resetDb,
  createUser,
  createMessage,
  getUser,
}