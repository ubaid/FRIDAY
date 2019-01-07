import { LOGIN_REQ, LOGIN_RESULT, LOGIN_ERR } from './actions';

export default (state = {
  user: {},
  errorMessage: null,
}, action) => {
  switch (action.type) {
    case LOGIN_REQ:
      return {
        ...state,
        errorMessage: null,
      };
    case LOGIN_RESULT:
      return {
        ...state,
        user: action.data.user,
      };
    case LOGIN_ERR:
      return {
        ...state,
        user: {},
        errorMessage: 'Failed to login, Please make sure email or password is correct',
      };
    default:
      return state;
  }
};
