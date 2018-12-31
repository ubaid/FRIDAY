const validator = require('validator');
const { User } = require('../models/index');
const { to, throwError } = require('./util.service');

const getUniqueKeyFromBody = (body) => {
  // this is so they can send in 3 options unique_key, email, or phone and it will work
  let uniqueKey = body.unique_key;
  if (typeof uniqueKey === 'undefined') {
    if (typeof body.email !== 'undefined') {
      uniqueKey = body.email;
    } else if (typeof body.phone !== 'undefined') {
      uniqueKey = body.phone;
    } else {
      uniqueKey = null;
    }
  }

  return uniqueKey;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async(userInfo) => {
  const authInfo = {};
  authInfo.status = 'create';

  const uniqueKey = getUniqueKeyFromBody(userInfo);
  if (!uniqueKey) {
    throwError('An email or phone number was not entered.');
  }

  let user;
  let err;
  if (validator.isEmail(uniqueKey)) {
    authInfo.method = 'email';
    userInfo.email = uniqueKey;

    [ err, user ] = await to(User.create(userInfo));
    if (err) {
      throwError('user already exists with that email');
    }

    return user;
  } if (validator.isMobilePhone(uniqueKey, 'any')) { //checks if only phone number was sent
    authInfo.method = 'phone';
    userInfo.phone = uniqueKey;

    [ err, user ] = await to(User.create(userInfo));
    if (err) {
      throwError('user already exists with that phone number');
    }

    return user;
  }

  throwError('A valid email or phone number was not entered.');
  return 0;
};
module.exports.createUser = createUser;

const authUser = async(userInfo) => {
  const authInfo = {};
  authInfo.status = 'login';
  const uniqueKey = getUniqueKeyFromBody(userInfo);

  if (!uniqueKey) {
    throwError('Please enter an email or phone number to login');
  }


  if (!userInfo.password) {
    throwError('Please enter a password to login');
  }

  let user;
  let err;
  if (validator.isEmail(uniqueKey)) {
    authInfo.method = 'email';

    [ err, user ] = await to(User.findOne({ email: uniqueKey }));
    if (err) {
      throwError(err.message);
    }
  } else if (validator.isMobilePhone(uniqueKey, 'any')) { //checks if only phone number was sent
    authInfo.method = 'phone';

    [ err, user ] = await to(User.findOne({ phone: uniqueKey }));
    if (err) {
      throwError(err.message);
    }
  } else {
    throwError('A valid email or phone number was not entered');
  }

  if (!user) {
    throwError('Not registered');
  }

  [ err, user ] = await to(user.comparePassword(userInfo.password));

  if (err) {
    throwError(err.message);
  }

  return user;
};

module.exports.authUser = authUser;
