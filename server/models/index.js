const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const models = {};
const mongoose = require('mongoose');
const config = require('../config/config');

if (config.db.host !== '') {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const filename = file.split('.')[0];
      const modelName = filename.charAt(0).toUpperCase() + filename.slice(1);
      // eslint-disable-next-line
      models[modelName] = require(`./${ file }`);
    });

  mongoose.Promise = global.Promise; //set mongo up to use promises
  const mongoLocation = `mongodb://${ config.db.host }:${ config.db.port }/${ config.db.name }`;

  mongoose.connect(mongoLocation).catch(() => {
    // eslint-disable-next-line no-console
    console.log('*** Can Not Connect to Mongo Server:', mongoLocation);
  });

  const db = mongoose.connection;
  module.exports = db;
  db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to mongo at ${ mongoLocation }`);
  });
  db.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.log('error', error);
  });
  // End of Mongoose Setup
} else {
  // eslint-disable-next-line no-console
  console.log('No Mongo Credentials Given');
}

module.exports = models;
