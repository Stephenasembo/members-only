module.exports = (req, res, next) => {
  const code = req.body.secretCode;
  if(code === 'admin') {
    next();
  } else {
    res.send('Incorrect code!');
  }
}