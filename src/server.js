const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const mongodbConfig = require('./configs/mongodbConfig');
const passportConfig = require('./configs/passportConfig');
const { logger, expressLogger } = require('./configs/winstonConfig');

// Instance of express application
const expressApp = express();

// Configuration
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(expressLogger);
mongodbConfig.connect();
passportConfig.initialize();

// REST Routes
expressApp.use('/auth', require('./routes/rest/authRoutes'));
expressApp.use('/profile', require('./routes/rest/profileRoutes'));
expressApp.use('/communities', require('./routes/rest/communitiesRoutes'));

expressApp.post('/test', require('./configs/passportConfig').authenticate('jwt', { session: false }), (req, res) => {
    res.status(201).json({"a": "b"})
})

// Instance of server using express application
const restServer = http.createServer(expressApp);
const websocketServer = require('./websocketServer');

// Start the server
websocketServer(restServer);
const port = process.env.API_PORT;
restServer.listen(port, () => {
    logger.info(`Express Server running on http://localhost:${port}`);
})
