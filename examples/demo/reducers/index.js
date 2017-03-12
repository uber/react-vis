import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// import {DEFAULT_APP_STATE} from '../constants/defaults';

const DEFAULT_APP_STATE = {};

function appReducer(state = DEFAULT_APP_STATE, action) {
  switch (action.type) {
  default:
    break;
  }
  return state;
}

export default createStore(
  combineReducers({app: appReducer}),
  applyMiddleware(thunk)
);
