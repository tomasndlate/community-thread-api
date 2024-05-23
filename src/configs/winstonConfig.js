const winston = require('winston');
const expressWinston = require('express-winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

// Define the custom ignore route function
const ignoreSwaggerDocsRoute = (req, res) => {
    return req.path.startsWith('/docs');
};

// Configure Express Winston middleware
const expressLogger = expressWinston.logger({
  transports: [
      new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.simple(),
  ),
  ignoreRoute: ignoreSwaggerDocsRoute,
  // Include all metadata
  meta: true, 
  expressFormat: true,
  colorize: true,
  // Add the json response to the log   
  responseWhitelist: [...expressWinston.responseWhitelist, 'body']
});

module.exports = {
  logger,
  expressLogger
};
