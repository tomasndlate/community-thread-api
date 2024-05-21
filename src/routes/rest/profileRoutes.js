const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const profile = require('../../controllers/rest/profileController');
const { GET, createParameter, createBodyContent } = require('../../openapi/openapi-builder');
const router = express.Router();

GET({
    path: '/profile',
    summary: 'Get user self profile',
    description: 'API endpoint to get user self details.',
    operationId: 'getProfile',
    tags: ['Profile'],
    responses: {
        "200": {
            description: "Ok",
            content: createBodyContent([
                {
                    contentType: "application/json",
                    $ref: '#/components/schemas/User'
                }
            ])
        }
    },
    security: [
        {
            'BearerToken': []
        }
    ]
    
})
router.get('/', authMiddleware, profile.profile);

module.exports = router;