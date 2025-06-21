const db = require('../models/db/queries');

module.exports = async (req, res, next) => {
  const code = req.body.secretCode;
  if(code === 'hello') {
    // Update membership status;
    await db.updateMembershipStatus(req.user.id); 
    return next();
  }
  res.send('Incorrect code!')
}