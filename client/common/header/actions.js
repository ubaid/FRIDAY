export const LOGOUT_REQ = 'Login.LOGOUT_REQ';
export const LOGOUT_RESULT = 'Login.LOGOUT_RESULT';
export const LOGOUT_ERR = 'Login.LOGOUT_ERR';

export const logout = () => {
  return {
    type: LOGOUT_REQ,
    url: '/v1/api/user/logout',
  };
};
