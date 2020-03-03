import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import localForage from 'localforage';

import app from './app';
import authentication from './authentication';
import session from './session';
import dictionary from './dictionary';
import payments from './payments';
import payouts from './payouts';

const appConfig = {
    key: 'app',
    storage: localForage,
    whitelist: ['project'],
};

const sessionConfig = {
    key: 'session',
    storage: localForage,
    whitelist: ['oauth'],
};

const paymentsConfig = {
    key: 'payments',
    storage: localForage,
    whitelist: ['filter'],
};

const payoutsConfig = {
    key: 'payouts',
    storage: localForage,
    whitelist: ['filter'],
};

export default history => combineReducers({
    router: connectRouter(history),
    app: persistReducer(appConfig, app),
    authentication,
    session: persistReducer(sessionConfig, session),
    dictionary,
    payments: persistReducer(paymentsConfig, payments),
    payouts: persistReducer(payoutsConfig, payouts),
});
