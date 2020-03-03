import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import localForage from 'localforage';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { api } from '@client/helpers';

import authenticationSaga from '@client/sagas/authentication';
import dictionarySaga from '@client/sagas/dictionary';
import paymentsSaga from '@client/sagas/payments';
import payoutsSaga from '@client/sagas/payouts';

import reducer from './reducer';


export const history = createBrowserHistory();
const persistedReducer = persistReducer({
    storage: localForage,
    key: 'payments-client',
    blacklist: ['router', 'authentication', 'payments', 'payouts'],
}, reducer(history));
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, routerMiddleware(history), sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    middleware.push(require('redux-logger').logger);
}

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persist = persistStore(store);

api.setStore(store);

window.persist = persist;

sagaMiddleware.run(authenticationSaga);
sagaMiddleware.run(dictionarySaga);
sagaMiddleware.run(paymentsSaga);
sagaMiddleware.run(payoutsSaga);
