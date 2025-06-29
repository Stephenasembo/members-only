require('dotenv').config()
const db = require('../models/db/queries');
const passCode = process.env.MEMBER_CODE;

module.exports = async (req, res, next) => {
  const code = req.body.secretCode;
  if(code === passCode) {
    // Update membership status;
    await db.updateMembershipStatus(req.user.id); 
    return res.redirect('/homepage');
  }
  res.send('Incorrect code!')
}