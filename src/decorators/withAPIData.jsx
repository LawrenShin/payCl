import React, { useEffect, useReducer } from 'react';
import { api } from '@client/helpers';

const initialState = {
    loading: true,
    data: null,
};

const reducer = (state, action) => {
    if (action.type === 'ready') {
        return {
            ...state,
            loading: false,
            data: action.response,
        };
    }

    return state;
};

const withAPIData = (endpoint, params) => Component => (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, data } = state;

    useEffect(() => {
        const resolvedEndpoint = typeof endpoint === 'function' ? endpoint(props) : endpoint;
        const resolverParams = typeof params === 'function' ? params(props) : params;
        api.get(resolvedEndpoint, resolverParams).then((response) => {
            dispatch({ type: 'ready', response });
        });
    }, []);

    return <Component {...props} data={data} loading={loading} />;
};

export default withAPIData;
