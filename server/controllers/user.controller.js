const _ = require('underscore');
const authService = require('../services/auth.service');
const DVUtils = require('../../shared/utils');
const { to, reE, reS } = require('../services/util.service');

const create = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // eslint-disable-next-line prefer-destructuring
  const body = req.body;
  if (!body.unique_key && !body.email && !body.phone) {
    return reE(res, 'Please enter an email or phone number to register.');
  } if (!body.password) {
    return reE(res, 'Please enter a password to register.');
  }

  const [ err, user ] = await to(authService.createUser(body));
  if (err) {
    return reE(res, err, 422);
  }
  return reS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
};

const get = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return reS(res, { user: req.user.toWeb() });
};

const update = async(req, res) => {
  // eslint-disable-next-line prefer-destructuring
  let user = req.user;
  const data = req.body;
  user.set(data);

  let err;
  [ err, user ] = await to(user.save());
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err, user);

    if (err.message.includes('E11000')) {
      if (err.message.includes('phone')) {
        err = 'This phone number is already in use';
      } else if (err.message.includes('email')) {
        err = 'This email address is already in use';
      } else {
        err = 'Duplicate Key Entry';
      }
    }

    return reE(res, err);
  }
  return reS(res, { message: `Updated User: ${ user.email }` });
};

const remove = async(req, res) => {
  const [ err ] = await to(req.user.destroy());
  if (err) {
    return reE(res, 'error occured trying to delete user');
  }

  return reS(res, { message: 'Deleted User' }, 204);
};

const login = async(req, res) => {
  const [ err, user ] = await to(authService.authUser(req.body));
  if (err) {
    return reE(res, err, 422);
  }

  res.cookie(DVUtils.FRIDAY_AUTH_TOKEN_KEY, user.getJWT(), { expire: 9999 });
  return reS(res, { token: user.getJWT(), user: user.toWeb() });
};

const logout = (req, res) => {
  if (_.isEmpty(req.cookies[DVUtils.FRIDAY_AUTH_TOKEN_KEY])) {
    return reE(res, 'User no logged in', 422);
  }

  res.cookie(DVUtils.FRIDAY_AUTH_TOKEN_KEY, DVUtils.EMPTY_STRING, { maxAge: 9999 });
  res.redirect(DVUtils.LOGIN_PATH);
  return 0;
};

module.exports = {
  create,
  get,
  update,
  remove,
  login,
  logout,
};
