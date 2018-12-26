const CONFIG = require('../config/config');
const { to, reE, reS } = require('../services/util.service');
const { ProbabilityConfig } = require('../models');
const elasticService = require('../services/elasticsearch.service');
const bayesService = require('../services/bayes.service');
const phraseQueryBuilder = require('../elasticsearch/querybuilder/phrase');

const score = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const customers = req.body.customers;
  const customersCount = customers.length;
  if (customersCount > CONFIG.scoring_max_ip_size) {
    return reE(res, 'Payload exceeds allowed limit.', 413);
  }

  const [ err, probabilityConfigs ] = await to(ProbabilityConfig.find({}));

  if (err) {
    return reE(res, 'err getting probabilityConfigs');
  }

  customers.forEach((element) => {
    element.score = 0.5;

    probabilityConfigs.forEach(async(config) => {
      if (!element[config.field] || element[config.field] === '') {
        return;
      }

      const phraseQuery = phraseQueryBuilder.getQueryBody(config.field, element[config.field]);
      const results = await elasticService.search(CONFIG.es_profileIndex.customer, phraseQuery);

      if (results.hits.total > 0) {
        element.score = bayesService.computeNaiveBayes(element.score, config.high);
      } else {
        element.score = bayesService.computeNaiveBayes(element.score, config.low);
      }
    });
  });

  return reS(res, { customers }, 200);
};

module.exports.score = score;
