const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/db/queries');
const bcrypt = require('bcryptjs');

const strategy = async (username, password, done) => {
  try {
    const user = await db.getUser(null, username);

    if (user === undefined) {
      return done(null, false, { message: 'Username not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }
    done(null, user)
  } catch(err) {
    done(err)
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUser(userId, null);
    done(null, user);
  } catch(err) {
    done(err)
  }
})

passport.use(new LocalStrategy(strategy));

module.exports = passport;