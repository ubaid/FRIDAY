var elasticsearch = require('elasticsearch');
const CONFIG = require('../config/config');

var client = new elasticsearch.Client({
    hosts:CONFIG.es_host
})

module.exports=client