const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { 
    createCommunity, 
    getCommunities, 
    getCommunity, 
    putCommunityMembers, 
    putJoinCommunity, 
    getCommunityMembers, 
    getCommunityThreads, 
    getCommunityThread 
} = require('../../controllers/rest/communitiesController');
const { 
    GET, 
    POST , 
    createParameter, 
    createBodyContent
} = require('../../openapi/openapi-builder');

// Create community
POST({
    path: '/communities',
    summary: 'Create a new Community',
    description: 'API endpoint to create a new Community',
    operationId: 'postCommunity',
    tags: ['Communities'],
    requestBody: {
        description: '',
        required: '',
        content: createBodyContent([
            {
                contentType: 'application/json',
                $ref: '#/components/schemas/Community',
            }
        ])
    },
    responses: {
        "200": {
            description: 'Ok',
            content: createBodyContent([
                {
                    contentType: 'application/json',
                    $ref: '#/components/schemas/Community'
                }
            ])
        }
    },
    security: [
        { 'BearerToken': [] }
    ]
})
router.post('/', authMiddleware, createCommunity);

// Get all communities (optional params)
GET({
    path: '/communities',
    summary: 'Get all the communities',
    description: 'API endpoint to get communities with optional search params (name, page, limit)',
    operationId: 'getCommunities',
    tags: ['Communities'],
    parameters: [
        createParameter({
            name: 'name',
            in: 'query',
            description: 'Name of communities to search',
            required: false,
            type: 'string',
        }),
        createParameter({
            name: 'page',
            in: 'query',
            description: 'Page of the communities searched',
            required: false,
            type: 'integer',
        }),
        createParameter({
            name: 'limit',
            in: 'query',
            description: 'Limit of communities per page',
            required: false,
            type: 'integer',
        })
    ],
    responses: {
        "200": {
            description: '',
            content: createBodyContent([
                {
                    contentType: 'application/json',
                    type: 'array',
                    itemsRef: '#/components/schemas/Community',
                }
            ])
        }
    },
})
router.get('/', getCommunities);

// Get community by nameId
GET({
    path: "/communities/:community",
    summary: 'Get Community by nameId',
    description: 'API endpoint to get community by it nameId.',
    operationId: 'getCommunity',
    tags: ['Communities'],
    parameters: [
        createParameter({ 
            name: "community",
            in: "path", 
            description: "community correspond to community nameId", 
            required: true,
            type: "string"
        })
    ],
    responses: {
        "200": {
            description: "Ok",
            content: createBodyContent([
                {
                    contentType: "application/json",
                    $ref: '#/components/schemas/Community'
                }
            ])
        }
    },
    security: [
        { 'BearerToken': [] }
    ]
})
// TODO: Change from name to nameID
router.get('/:community', getCommunity);

// Add members to a community
router.put('/:community/members', authMiddleware, putCommunityMembers);

// Get community members
router.get('/:community/members', getCommunityMembers);

// Join a community
router.put('/:community/join', authMiddleware, putJoinCommunity);

// Get Community Threads
router.get('/:community/threads', getCommunityThreads);

// Get Community Thread
router.get('/:community/threads/:threadNameId', getCommunityThread);

module.exports = router;