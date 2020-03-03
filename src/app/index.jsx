import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import { store, persist, history } from '@client/store';
import { Content, PrivateRoute, DebugPanel } from '@client/components';
import { Login } from '@client/app/pages';
import moment from 'moment';
import 'moment-timezone';
import 'antd/dist/antd.min.css';

moment.locale('ru');
moment.tz(store.getState().app.tz);

const Application = () => (
    <Provider store={store}>
        <PersistGate persistor={persist}>
            <ConnectedRouter history={history}>
                <Route exact path="/login" component={Login} />
                <PrivateRoute path="/" component={Content} />
                <DebugPanel />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);

export default Application;
