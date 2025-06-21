module.exports = (req, res, next) => {
  const code = req.body.secretCode;
  if(code === 'hello') {
    return next();
  }
  res.send('Incorrect code!')
}