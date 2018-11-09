import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../store/reducers'

export default store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );