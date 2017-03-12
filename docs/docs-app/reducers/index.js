import {Map} from 'immutable';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const DEFAULT_STATE = Map();

function markdownLoader(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case 'LOAD_CONTENT':
    return Object.keys(action.payload)
      .reduce((res, key) => res.set(key, action.payload[key]), state);
  default:
    break;
  }
  return state;
}

export default createStore(
  combineReducers({markdownPages: markdownLoader}),
  applyMiddleware(thunk)
);
