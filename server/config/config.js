require('dotenv').config();

const config = {
  app: process.env.APP || 'development',
  port: process.env.PORT || '3000',
  log: {
    logLevel: process.env.LOG_LEVEL || 'info',
    logDirectory: process.env.LOG_DIRECTORY || './logs',
    logFile: 'server.log',
    logConsole: false,
  },
  jwt: {
    encryption: process.env.JWT_ENCRYPTION || 'Ob8GcD4LyZpw5hvUtpXh!',
    expiration: process.env.JWT_EXPIRATION || '10000',
  },
  db: {
    dialect: process.env.DB_DIALECT || 'mongo',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'name',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'db-password',
  },
  scoring: {
    maxIPSize: 2,
  },
  search: {
    host: `${ process.env.SEARCH_HOST || 'localhost' }:${ process.env.SEARCH_PORT || '9200' }`,
    profileType: 'data',
  },
};

module.exports = config;
