const express = require('express');
const router = express.Router();
const passport = require('../../configs/passportConfig');
const authController = require('../../controllers/rest/authController');

router.post('/login', passport.authenticate('local', { session: false }), authController.login);

router.post('/google')

router.post('/signup', authController.signup);

module.exports = router;