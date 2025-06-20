require('dotenv').config()

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res, next) => {
  res.send('Welcome to the app.')
})

app.listen(PORT, () => {
  console.log(`The app is live on port - ${PORT}`)
})