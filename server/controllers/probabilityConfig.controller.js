const { ProbabilityConfig } = require('../models/index');
const { to, reE, reS } = require('../services/util.service');

const create = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const probabilityConfigInfo = req.body;
  const [ err, probabilityConfig ] = await to(ProbabilityConfig.create(probabilityConfigInfo));
  if (err) {
    return reE(res, err, 422);
  }

  return reS(res, { probabilityConfig: probabilityConfig.toWeb() }, 201);
};

const getAll = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const [ err, probabilityConfigs ] = await to(ProbabilityConfig.find({}));
  if (err) {
    return reE(res, 'err getting probabilityConfigs');
  }

  const probabilityConfigsJson = [];

  Object.values(probabilityConfigs).map((probabilityConfig) => {
    return probabilityConfigsJson.push(probabilityConfig.toWeb());
  });

  return reS(res, { probabilityConfigs: probabilityConfigsJson });
};

const update = async(req, res) => {
  let err;

  let probabilityConfig = new ProbabilityConfig(req.body);
  probabilityConfig.isNew = false;

  // eslint-disable-next-line prefer-const
  [ err, probabilityConfig ] = await to(probabilityConfig.save());
  if (err) {
    return reE(res, err);
  }

  return reS(res, { probabilityConfig: probabilityConfig.toWeb() });
};

const remove = async(req, res) => {
  const [ err ] = await to(new ProbabilityConfig(req.body).remove());
  if (err) {
    return reE(res, 'error occured trying to delete the probabilityConfig');
  }

  return reS(res, { message: 'Deleted probabilityConfig' }, 204);
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
