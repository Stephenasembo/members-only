require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/indexRouter')
const session = require('express-session');
const passport = require('./config/passport');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/pool')

const sessionStore = new pgSession({
  createTableIfMissing: true,
  pool,
  tableName: 'user_sessions',
})

app.use(session({
  store: sessionStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}))

app.use(passport.initialize());
app.use(passport.session());

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT;

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`The app is live on port - ${PORT}`)
})