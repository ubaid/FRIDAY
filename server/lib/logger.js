const fs = require('fs');
const path = require('path');
const { Logger, transports } = require('winston');
const WSEnums = require('./enum');

const logConfig = require('./../config/config').log;

const getLogLevel = () => {
  return logConfig.logLevel || WSEnums.LOG_LEVEL.INFO;
};

const getFileLoggerConfig = () => {
  if (!fs.existsSync(logConfig.logDirectory)) {
    // Create the Log directory.
    try {
      fs.mkdirSync(logConfig.logDirectory);
    } catch (error) {
      throw new Error('Unable to create Log directory');
    }
  }

  return {
    maxsize: logConfig.maxsize || 1024 * 1024 * 512, // Default rollover size 512 MB
    logLevel: getLogLevel(),
    logFile: path.resolve(logConfig.logDirectory, logConfig.logFile),
  };
};

const getConsoleLogger = () => {
  return new (transports.Console)({
    timestamp: true,
    json: false,
    level: getLogLevel(),
  });
};

const getFileLogger = () => {
  const loggerConfig = getFileLoggerConfig();

  return new (transports.File)({
    colorize: false,
    timestamp: true,
    json: false,
    filename: loggerConfig.logFile,
    level: loggerConfig.logLevel,
    maxsize: loggerConfig.maxsize,
  });
};

let logger;
const initLogger = () => {
  if (logger) {
    return logger;
  }

  return new Logger({
    transports: logConfig.logConsole ? [ getConsoleLogger() ] : [ getFileLogger() ],
  });
};

logger = initLogger();

module.exports = logger;
