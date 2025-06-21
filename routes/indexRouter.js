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

module.exports = router;