const { Company } = require('../models/index');
const { to, reE, reS } = require('../services/util.service');

const create = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const companyInfo = req.body;
  companyInfo.users = [ { user: req.user._id } ];

  const [ err, company ] = await to(Company.create(companyInfo));
  if (err) {
    return reE(res, err, 422);
  }

  return reS(res, { company: company.toWeb() }, 201);
};

const getAll = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const [ companies ] = await to(req.user.Companies());
  return reS(res, { companies: companies.map(company => company.toWeb()) });
};

const get = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return reS(res, { company: req.company.toWeb() });
};

const update = async(req, res) => {
  let err;
  let company = req.user;
  const data = req.body;

  company.set(data);
  // eslint-disable-next-line prefer-const
  [ err, company ] = await to(company.save());

  if (err) {
    return reE(res, err);
  }
  return reS(res, { company: company.toWeb() });
};

const remove = async(req, res) => {
  const [ err ] = await to(req.company.remove());
  if (err) {
    return reE(res, 'error occured trying to delete the company');
  }

  return reS(res, { message: 'Deleted Company' }, 204);
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
