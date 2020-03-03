import * as authTypes from '@client/store/authentication/actionTypes';
import * as types from './actionTypes';

const initialState = {
    oauth: null,
    otp: null,
    login: null,
    authentication: {
        signIn: {
            username: null,
            password: null,
            success: false,
        },
        twoFactor: {
            enabled: false,
            qrCodeString: null,
            password: null,
            success: false,
        },
    },
};

export default (state = initialState, action) => {
    if (action.type === types.SESSION_TOKEN) {
        return {
            ...state,
            oauth: {
                expires: action.expires,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            },
        };
    }

    if (action.type === types.SESSION_SIGN_IN) {
        return {
            ...state,
            authentication: {
                ...state.authentication,
                signIn: {

                },
                username: action.username,
                password: action.password,
            },
        };
    }

    if (action.type === types.SESSION_TWO_FACTOR_DATA) {
        return {
            ...state,
            otp: action.data,
        };
    }

    if (action.type === authTypes.AUTHENTICATION_LOG_OUT_COMPLETE) {
        return {
            ...initialState,
        };
    }

    return state;
};
