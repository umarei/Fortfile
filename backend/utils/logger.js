const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Log levels
const logLevels = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

// Generic logger function
const logger = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}]: ${message}`;

  // Log to console
  console.log(logMessage);

  // Append to log file
  fs.appendFileSync(logFilePath, `${logMessage}\n`, 'utf8');
};

// Convenience functions for specific log levels
const info = (message) => logger(logLevels.INFO, message);
const warn = (message) => logger(logLevels.WARN, message);
const error = (message) => logger(logLevels.ERROR, message);

module.exports = { logger, info, warn, error };
