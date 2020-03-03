import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router';
import withData from './data';

const PrivateRoute = ({ authenticated, component: Component, ...other }) => {
    const renderRoute = useCallback(props => (
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
    ), [authenticated, Component, other]);

    return <Route {...other} render={renderRoute} />;
};

export default withData(PrivateRoute);
