const pool = require('../../config/pool');
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
  if(user.membershipStatus === undefined) {
    user.membershipStatus = 'fresh';
  }
  const fullName = user.firstName + ' ' + user.lastName;
  const {username, password, membershipStatus, isAdmin} = user;
  const values = [fullName, username, password,
    membershipStatus, isAdmin
  ];
  const SQL = `
  INSERT INTO users
  (full_name, username, password,
  membership_status, isAdmin)
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *;
  `
  const { rows } = await pool.query(SQL, values);
  return rows[0];
}

const createMessage = async (message) => {
  const { title, time, text, user_id } = message;
  const values = [title, time, text, user_id];
  const SQL = `
  INSERT INTO messages
  (title, time, text, user_id)
  VALUES
  ($1, $2, $3, $4)
  `
  await pool.query(SQL, values);
}

const getUser = async (userId, username = null) => {
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

const getMessages = async () => {
  const SQL = `
  SELECT * FROM messages;
  `
  const { rows } = await pool.query(SQL);
  return rows;
}

const updateMembershipStatus = async (id) => {
  const SQL = `
  UPDATE users
  SET membership_status = 'member'
  WHERE id = $1
  `
  await pool.query(SQL, [id]);
}

const deleteMessage = async (id) => {
  const SQL = `
  DELETE FROM messages
  WHERE id = $1;
  `
  await pool.query(SQL, [id]);
}

const updateAdminStatus = async (id) => {
  const SQL = `
  UPDATE users
  SET isadmin = true
  WHERE id = $1;
  `
  await pool.query(SQL, [id]);
}

module.exports = {
  resetDb,
  createUser,
  createMessage,
  getUser,
  getMessages,
  updateMembershipStatus,
  deleteMessage,
  updateAdminStatus,
}