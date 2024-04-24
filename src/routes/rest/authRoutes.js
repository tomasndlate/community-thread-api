const express = require('express');
const router = express.Router();
const authController = require('../../controllers/rest/authController');
const loginMiddleware = require('../../middleware/loginMiddleware');

router.post('/login', loginMiddleware, authController.login);

router.post('/google')

router.post('/signup', authController.signup);

module.exports = router;