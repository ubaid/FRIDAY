const authService = require('../services/auth.service');
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
module.exports.create = create;

const get = async(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return reS(res, { user: req.user.toWeb() });
};
module.exports.get = get;

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
module.exports.update = update;

const remove = async(req, res) => {
  let err;
  // eslint-disable-next-line prefer-const
  [ err ] = await to(req.user.destroy());
  if (err) {
    return reE(res, 'error occured trying to delete user');
  }

  return reS(res, { message: 'Deleted User' }, 204);
};
module.exports.remove = remove;

const login = async(req, res) => {
  const [ err, user ] = await to(authService.authUser(req.body));
  if (err) {
    return reE(res, err, 422);
  }

  return reS(res, { token: user.getJWT(), user: user.toWeb() });
};
module.exports.login = login;
