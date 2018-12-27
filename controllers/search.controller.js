const elasticService = require('../services/elasticsearch.service');
const { to, reE, reS } = require('../services/util.service');

const search = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const searchOptions = req.body || {};
  const [ err, queryResult ] = await to(elasticService.searchWithPagination(searchOptions));

  if (err) {
    return reE(res, err);
  }

  return reS(res, queryResult);
};

module.exports = {
  search,
};
