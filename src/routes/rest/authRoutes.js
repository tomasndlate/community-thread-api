const express = require('express');
const router = express.Router();
const authController = require('../../controllers/rest/authController');

router.post('/login', authController.login);

router.post('/signup', authController.signup);

module.exports = router;