import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import baseReducer from 'reducers';
import apiService from '../middleware/api-service';

const configureStore = (history, preloadedState) => {
  const middleware = [ /* thunk, */ routerMiddleware(history), apiService ];

  const store = createStore(
    baseReducer,
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      // redux dev tools browser extension hooks. If the extension function is on the window, hook it up to the store
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );

  if (module.hot) {
    // Enable Webpack HMR for reducers
    module.hot.accept('reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('reducers').default);
    });
  }

  // Put the redux store on window for debugging purposes.
  window._redux = window._redux || {};
  window._redux.store = store;

  return store;
};

export default configureStore;
