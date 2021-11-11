import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from "./root-reducer"

const middlewares = [];

if (process.env.NODE_ENV === 'development')
    middlewares.push(logger);

middlewares.push(thunk);

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store);

const reduxStore = {store, persistor};

export default reduxStore;

