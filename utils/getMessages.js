const db = require('../models/db/queries')

module.exports = async (req, res, next) => {
  let messages = await db.getMessages();
  for(const msg of messages) {
    msg.author = (await db.getUser(msg.user_id)).username;
  }
  res.render('homepage', {messages, user: req.user})
}