import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import itemReducer from './items';
import storeReducer from './stores';
import reviewsReducer from './reviews';
import cartReducer from './carts';


const rootReducer = combineReducers({
  session,
  itemState: itemReducer,
  storeState: storeReducer,
  reviewState: reviewsReducer,
  cartState: cartReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
