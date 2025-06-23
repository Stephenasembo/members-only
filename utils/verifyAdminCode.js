require('dotenv').config()

const passCode = process.env.ADMIN_CODE;

module.exports = (req, res, next) => {
  const code = req.body.secretCode;
  if(code === passCode) {
    next();
  } else {
    res.send('Incorrect code!');
  }
}