const elasticsearch = require('elasticsearch');
const config = require('../config/config');

const client = new elasticsearch.Client({ hosts: config.search.host });

module.exports = client;
