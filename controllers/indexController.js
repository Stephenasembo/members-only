const db = require('../models/db/queries');
const passport = require('../config/passport');
const verifyCode = require('../utils/verifyCode');
const getClubMessages = require('../utils/getClubMessages');
const authorizeMember = require('../utils/authorizeMember');

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
  createUser: async (req, res, next) => {
    const user = await db.createUser(req.body);
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/homepage');
    })
  },

  loginUser: passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/homepage'
    }),
  
  getJoinClubForm: (req, res) => {
    res.render('welcome');
  },

  joinClub: [verifyCode, getClubMessages],

  getHomepage: [authorizeMember, getClubMessages]
}