import {applyMiddleware, createStore} from "redux";
import {persistStore} from 'redux-persist';
import {logger} from "redux-logger";

import rootReducer from "./root-reducer"

//const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(logger))

export const persistor = persistStore(store);

const reduxStore = {store, persistor};

export default reduxStore;

