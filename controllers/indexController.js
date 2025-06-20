const db = require('../models/db/queries');

module.exports = {
  getIndex: (req, res) => {
    res.render('index');
  },
  getSignUpForm: (req, res) => {
    res.render('sign-up');
  },
  getLoginForm: (req, res) => {
    res.render('login');
  },
  createUser: async (req, res) => {
    await db.createUser(req.body);
    res.send('welcome');
  },
  loginUser: (req, res) => {
    res.send('homepage');
  }
}