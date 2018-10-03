const CONFIG = require('../config/config');
const elasticClient = require('../elasticsearch/client');

module.exports.search = (indexName, payload)=>{
    return elasticClient.search({
        index: indexName,
        type: CONFIG.es_profileType,
        body: payload
    });
}

//module.exports.search = search;