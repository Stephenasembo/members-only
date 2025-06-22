const express = require('express');

const router = express.Router();

const controller = require('../controllers/indexController');

router.get('/', controller.getIndex);
router.get('/sign-up', controller.getSignUpForm);
router.get('/login', controller.getLoginForm);
router.post('/sign-up', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/welcome', controller.getJoinClubForm);
router.post('/welcome', controller.joinClub);
router.get('/homepage', controller.getHomepage);
router.get('/logout', controller.logoutUser);
router.get('/admin', controller.getAdminPage);
router.get('/delete/:msgId', controller.deleteMessage);
router.get('/new-message/:userId', controller.getMessageForm);
router.post('/new-message/:userId', controller.createMessage);
router.get('/admin-registration/:userId', controller.getAdminForm);
router.post('/admin-registration/:userId', controller.makeAdmin);
router.get('/protected-route', controller.getProtectedPage);

module.exports = router;