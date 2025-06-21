const passport = require('../config/passport');

module.exports = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/homepage'
})