import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer"
import rootSaga from "./root-saga";

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === 'development')
    middlewares.push(logger);

middlewares.push(thunk);
middlewares.push(sagaMiddleware);

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const reduxStore = {store, persistor};

export default reduxStore;

