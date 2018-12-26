const CONFIG = require('../config/config');
const { to, ReE, ReS } = require('../services/util.service');
const { ProbabilityConfig } = require('../models');
const elasticService = require('../services/elasticsearch.service');
const bayesService = require('../services/bayes.service');
const phraseQueryBuilder = require('../elasticsearch/querybuilder/phrase');

const score = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const customers = req.body.customers;
  const customersCount = customers.length;
  if (customersCount > CONFIG.scoring_max_ip_size) return ReE(res, 'Payload exceeds allowed limit.', 413);

  let err; let
    probabilityConfigs;
  [ err, probabilityConfigs ] = await to(ProbabilityConfig.find({}));

  if (err) return ReE(res, 'err getting probabilityConfigs');


  for (const element of customers) {
    element.score = 0.5;

    for (const config of probabilityConfigs) {
      {
        if (!element.hasOwnProperty(config.field) || !element[config.field] || element[config.field] === '') {
          continue;
        }

        const phraseQuery = phraseQueryBuilder.getQueryBody(config.field, element[config.field]);
        const results = await elasticService.search(CONFIG.es_profileIndex.customer, phraseQuery);

        if (results.hits.total > 0) {
          element.score = bayesService.computeNaiveBayes(element.score, config.high);
        } else {
          element.score = bayesService.computeNaiveBayes(element.score, config.low);
        }
      }
    }
  }

  return ReS(res, { customers }, 200);
};

module.exports.score = score;
