import _ from 'underscore';

import { SEARCH_REQ, SEARCH_RESULT, SEARCH_ERR } from './actions';

export default (state = {
  fetching: false,
  offset: 0,
  total: 0,
  items: [],
  errorMessage: null,
}, action) => {
  switch (action.type) {
    case SEARCH_REQ:
      return {
        ...state,
        fetching: true,
        errorMessage: null,
      };
    case SEARCH_RESULT:
      return {
        ...state,
        fetching: false,
        total: action.data.total,
        offset: state.offset + _.size(action.data.items),
        items: action.data.items,
      };
    case SEARCH_ERR:
      return {
        ...state,
        fetching: false,
        errorMessage: 'Failed to execute search query',
      };
    default:
      return state;
  }
};
