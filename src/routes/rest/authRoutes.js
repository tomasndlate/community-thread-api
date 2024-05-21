const express = require('express');
const router = express.Router();
const authController = require('../../controllers/rest/authController');
const loginMiddleware = require('../../middleware/loginMiddleware');
const googleMiddleware = require('../../middleware/googleMidleware');
const passport = require('../../configs/passportConfig');
const { GET, createParameter, createBodyContent, POST } = require('../../openapi/openapi-builder');

POST({
    path: '/auth/login',
    summary: 'Login to get access token',
    description: 'API endpoint to get the access token through a username & password',
    operationId: 'login',
    tags: ['Auth'],
    requestBody: {
        description: '',
        required: true,
        content: createBodyContent([
            {
                contentType: 'application/json',
                $ref: "#/components/schemas/LoginForm"
            }
        ])
    },
    responses: {
        "200": {
            description: '',
            content: createBodyContent([
                {
                    contentType: 'application/json',
                    $ref: '#/components/schemas/BearerToken',
                }
            ])
        }
    }
})
router.post('/login', loginMiddleware, authController.login);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', googleMiddleware, authController.login);

router.post('/signup', authController.signup);

module.exports = router;