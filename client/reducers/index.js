import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginReducer from 'app/login/reducer';
import searchReducer from 'app/search/reducer';
import scoringReducer from 'app/scoring/reducer';

const combinedReducer = combineReducers({
  routing: routerReducer,
  loginReducer,
  searchReducer,
  scoringReducer,
});

export default (state, action) => (combinedReducer(state, action));
