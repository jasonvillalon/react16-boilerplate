import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { sampleReducer } from './modules/sample';

const rootReducer = combineReducers({
  router: routerReducer,
  sample: sampleReducer,
});

export default rootReducer;
