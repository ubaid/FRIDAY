import _ from 'underscore';

export const LOGIN_REQ = 'Login.LOGIN_REQ';
export const LOGIN_RESULT = 'Login.LOGIN_RESULT';
export const LOGIN_ERR = 'Login.LOGIN_ERR';

export const login = (email, password) => {
  if (_.isEmpty(email) || _.isEmpty(password)) {
    throw new Error('Invalid user details to login.');
  }

  return {
    method: 'POST',
    type: LOGIN_REQ,
    url: '/v1/users/login',
    data: { email, password },
  };
};
