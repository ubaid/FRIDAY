const { Company } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err; let
    company;
  const user = req.user;

  const company_info = req.body;
  company_info.users = [ { user: user._id } ];

  [ err, company ] = await to(Company.create(company_info));
  if (err) return ReE(res, err, 422);

  return ReS(res, { company: company.toWeb() }, 201);
};
module.exports.create = create;

const getAll = async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const user = req.user;
  let err; let
    companies;
  [ err, companies ] = await to(user.Companies());

  const companies_json = [];
  for (const i in companies) {
    const company = companies[i];
    companies_json.push(company.toWeb());
  }
  return ReS(res, { companies: companies_json });
};
module.exports.getAll = getAll;

const get = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const company = req.company;
  return ReS(res, { company: company.toWeb() });
};
module.exports.get = get;

const update = async function(req, res) {
  let err; let company; let
    data;
  company = req.user;
  data = req.body;
  company.set(data);

  [ err, company ] = await to(company.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { company: company.toWeb() });
};
module.exports.update = update;

const remove = async function(req, res) {
  let company; let
    err;
  company = req.company;

  [ err, company ] = await to(company.remove());
  if (err) return ReE(res, 'error occured trying to delete the company');

  return ReS(res, { message: 'Deleted Company' }, 204);
};
module.exports.remove = remove;
