const db = require('../models/db/queries');
const passport = require('../config/passport');
const verifyCode = require('../utils/verifyCode');
const getMessages = require('../utils/getMessages');

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
    const user = await db.createUser(req.body);
    req.login(user, (err) => {
      if (err) return next(err);
      return res.send('Logged in.');
    })
  },
  loginUser: (req, res) => {
    res.render('welcome');
  },
  getJoinClubForm: (req, res) => {
    res.render('welcome');
  },
  joinClub: [verifyCode, getMessages]
}