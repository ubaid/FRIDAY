import {
  LOGOUT_REQ, LOGOUT_RESULT, LOGOUT_ERR,
} from './actions';

export default (state = {
  user: {},
  errorMessage: null,
}, action) => {
  switch (action.type) {
    case LOGOUT_REQ:
      return {
        ...state,
        errorMessage: null,
      };
    case LOGOUT_RESULT:
      return {
        ...state,
        user: {},
      };
    case LOGOUT_ERR:
      return {
        ...state,
        errorMessage: 'Failed to logout',
      };
    default:
      return state;
  }
};
