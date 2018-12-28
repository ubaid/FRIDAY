const Company = require('../models/company.model');
const { to, reE } = require('../services/util.service');

const company = async(req, res, next) => {
  const companyId = req.params.company_id;

  const [ err, company ] = await to(Company.findOne({ _id: companyId }));
  if (err) {
    return reE(res, 'err finding company');
  }

  if (!company) {
    return reE(res, `Company not found with id: ${ companyId }`);
  }

  const usersArray = company.users.map(obj => String(obj.user));

  if (!usersArray.includes(String(req.user._id))) {
    return reE(res, `User does not have permission to read app`);
  }

  req.company = company;
  next();
  return 0;
};

module.exports.company = company;
