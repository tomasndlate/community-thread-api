const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const loginMiddleware = require('../../middleware/loginMiddleware');
const googleMiddleware = require('../../middleware/googleMidleware');
const passport = require('../../configs/passportConfig');

router.post('/signup', authController.signup);

router.post('/login', loginMiddleware, authController.login);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', googleMiddleware, authController.login);

module.exports = router;