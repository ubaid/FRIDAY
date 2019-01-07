import { CUST_SCORING_REQ, CUST_SCORING_RESULT, CUST_SCORING_ERR } from './actions';

export default (state = {
  score: null,
  errorMessage: null,
}, action) => {
  switch (action.type) {
    case CUST_SCORING_REQ:
      return {
        ...state,
        errorMessage: null,
      };
    case CUST_SCORING_RESULT:
      return {
        ...state,
        score: action.data.customers[0].score,
      };
    case CUST_SCORING_ERR:
      return {
        ...state,
        score: null,
        errorMessage: 'Failed to login, Please make sure email or password is correct',
      };
    default:
      return state;
  }
};
