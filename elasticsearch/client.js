const elasticsearch = require('elasticsearch');
const CONFIG = require('../config/config');

const client = new elasticsearch.Client({
  hosts: CONFIG.es_host,
});

module.exports = client;
