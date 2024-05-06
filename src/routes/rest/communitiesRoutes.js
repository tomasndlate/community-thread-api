const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { createCommunity } = require('../../controllers/rest/communitiesController');

// Create community
router.post('/', authMiddleware, createCommunity);

module.exports = router;