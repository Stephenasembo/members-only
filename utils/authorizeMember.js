const db = require('../models/db/queries')

module.exports = async (req, res, next) => {
  if(!req.user) {
    return res.redirect('/protected-route');
  }
  const user = await db.getUser(req.user.id);
  if(user.membership_status === 'member') {
    return next()
  } else {
    const messages = await db.getMessages();
    res.render('homepage', {user, messages})
  }
}