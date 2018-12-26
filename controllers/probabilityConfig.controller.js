const { ProbabilityConfig } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err; let
    probabilityConfig;
  const user = req.user;

  const probabilityConfig_info = req.body;
  //company_info.users = [{user:user._id}];

  [ err, probabilityConfig ] = await to(ProbabilityConfig.create(probabilityConfig_info));
  if (err) return ReE(res, err, 422);

  return ReS(res, { probabilityConfig: probabilityConfig.toWeb() }, 201);
};
module.exports.create = create;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const user = req.user;
  let err; let
    probabilityConfigs;
  [ err, probabilityConfigs ] = await to(ProbabilityConfig.find({}));

  if (err) return ReE(res, 'err getting probabilityConfigs');

  const probabilityConfigs_json = [];
  for (const i in probabilityConfigs) {
    const probabilityConfig = probabilityConfigs[i];
    probabilityConfigs_json.push(probabilityConfig.toWeb());
  }
  return ReS(res, { probabilityConfigs: probabilityConfigs_json });
};
module.exports.getAll = getAll;

// const get = function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let company = req.company;
//     return ReS(res, {company:company.toWeb()});
// }
// module.exports.get = get;

const update = async function(req, res) {
  let err; let probabilityConfig; let
    data;
  data = req.body;

  probabilityConfig = new ProbabilityConfig(data);
  probabilityConfig.isNew = false;
  [ err, probabilityConfig ] = await to(probabilityConfig.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { probabilityConfig: probabilityConfig.toWeb() });
};
module.exports.update = update;

const remove = async function(req, res) {
  let probabilityConfig; let
    err;
  probabilityConfig = new ProbabilityConfig(req.body);

  [ err, probabilityConfig ] = await to(probabilityConfig.remove());
  if (err) return ReE(res, 'error occured trying to delete the probabilityConfig');

  return ReS(res, { message: 'Deleted probabilityConfig' }, 204);
};
module.exports.remove = remove;
