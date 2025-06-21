const db = require('../models/db/queries')

module.exports = async (req, res, next) => {
  let messages = await db.getMessages();
  for(const msg of messages) {
    msg.author = (await db.getUser(msg.user_id)).username;
  }
  console.log(messages)
  res.render('homepage', {messages})
}