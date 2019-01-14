const _ = require('underscore');
const config = require('../config/config');
const IndexManager = require('../elasticsearch/indexmanager');
const QueryBuilder = require('../elasticsearch/querybuilder');
const ElasticClient = require('../elasticsearch/queryclient');
const { throwError } = require('./util.service');

const search = (indexName, payload) => {
  return ElasticClient.search({
    index: indexName,
    type: config.search.profileType,
    body: payload,
  });
};

const areOptionsValid = (options) => {
  return _.isObject(options)
    && _.isNumber(options.from)
    && _.isNumber(options.size)
    && !_.isEmpty(options.index)
    && !_.isEmpty(options.type)
    && _.isObject(options.body)
    && _.isObject(options.body.query);
};

const searchWithPagination = async(inputOptions) => {
  const indexConfig = IndexManager.getIndexConfig(inputOptions.index);
  if (!_.isObject(indexConfig)) {
    throwError(`Incorrect index value defined in search config ${ JSON.stringify(inputOptions) }`);
  }

  const options = _.extend({ fields: _.pluck(_.filter(indexConfig.fields, field => field.search), 'name') }, inputOptions);
  const queryBody = String(options.exact) === 'true'
      ? QueryBuilder.getExactMatchQuery(options)
      : QueryBuilder.getSearchQuery(options);
  const queryOptions = _.extend({
    data: true,
    offset: 0,
    limit: 10,
    body: queryBody,
  }, options);
  const esQuery = {
    index: indexConfig.index,
    type: config.search.profileType,
    from: parseInt(queryOptions.offset, 10),
    size: parseInt(queryOptions.limit, 10),
    body: queryOptions.body,
  };

  if (!areOptionsValid(esQuery)) {
    throwError(`Invalid search query ${ JSON.stringify(esQuery) }`);
  }

  return ElasticClient.search(esQuery)
    .then((esDocs) => {
      if (!_.isObject(esDocs)) {
        return throwError('Error while executing search query.');
      }

      const resultObject = { total: esDocs.hits.total, time: esDocs.took };
      if (!queryOptions.data) {
        return resultObject;
      }

      const results = [];
      const maxScoreParam = esQuery.from ? parseFloat(inputOptions.maxScore || '0') : 0;
      const maxScore = maxScoreParam || (esDocs.hits.total ? esDocs.hits.hits[0]._score : 0);
      esDocs.hits.hits.forEach((entry) => {
        results.push(_.extend({
          score: entry._score,
          match: (queryOptions.offset === 0) && (entry._score === maxScore) ? '-' : (entry._score / maxScore * 100).toFixed(2),
        }, entry._source));
      });

      return _.extend({ items: results, maxScore: maxScore }, resultObject);
    })
    .catch((error) => {
      throwError(`Error while executing search query: ${ error }`);
    });
};

module.exports = {
  search,
  searchWithPagination,
};
