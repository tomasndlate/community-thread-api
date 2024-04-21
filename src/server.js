const express = require('express');
const http = require('http');
const cors = requite('cors');
require('dotenv').config();


// Instance of express application
const expressApp = express();

// Configuration
expressApp.use(cors());
expressApp.use(express.json());

// Routes
expressApp.use('/auth', require('./routes/rest/authRoute'));

// Instance of server using express application
const restServer = http.createServer(expressApp);
const websocketServer = require('./websocketServer');

// Start the server
websocketServer(restServer);
const port = process.env.API_PORT;
restServer.listen(port, () => {
    console.log(`Express Server running on http://localhost:${port}`)
})
