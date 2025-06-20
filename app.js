require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/indexRouter')

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