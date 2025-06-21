const db = require('../models/db/queries')

module.exports = async (req, res, next) => {
  if(!req.user) {
    return res.redirect('/login');
  }
  const user = await db.getUser(req.user.id);
  if(user.isadmin === true) {
    return next()
  }
  return res.status(403).send('You do not have access to this resource.')
}