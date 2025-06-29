const db = require('../models/db/queries');
const passport = require('../config/passport');
const verifyCode = require('../utils/verifyCode');
const getClubMessages = require('../utils/getClubMessages');
const authorizeMember = require('../utils/authorizeMember');
const authorizeAdmin = require('../utils/authorizeAdmin');
const verifyAdminCode = require('../utils/verifyAdminCode');

module.exports = {
  getIndex: (req, res) => {
    if(req.user) {
      return res.redirect('/homepage')
    }
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
  
  getJoinClubForm: [authorizeMember, (req, res) => {
    res.render('welcome');
  }],

  joinClub: verifyCode,

  getHomepage: [authorizeMember, getClubMessages],

  logoutUser: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect('/login')
      })
    })
  },

  getAdminPage: [authorizeAdmin, getClubMessages],

  deleteMessage: [authorizeAdmin, async (req, res, next) => {
    await db.deleteMessage(req.params.msgId)
    next()
  }, getClubMessages],

  getMessageForm: [authorizeMember,(req, res, next) => {
    res.render('new-message')
  }],

  createMessage: [authorizeMember, async (req, res, next) => {
    const message = req.body;
    message.user_id = Number(req.params.userId);
    message.time = new Date();
    await db.createMessage(message);
    res.redirect('/homepage')
  }],

  getAdminForm: [authorizeMember, (req, res, next) => {
    res.render('admin-form');
  }],

  makeAdmin: [authorizeMember, verifyAdminCode, async (req, res, next) => {
    const userId = Number(req.params.userId);
    await db.updateAdminStatus(userId);
    res.redirect('/homepage');
  }],

  getProtectedPage: (req, res, next) => {
    res.render('protected-route');
  }
}