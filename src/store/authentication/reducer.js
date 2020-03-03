import * as types from './actionTypes';

const initialState = {
    signIn: {
        checking: false,
        complete: true,
        errors: [],
    },
    twoFactor: {
        checking: false,
        connecting: false,
        enabled: true,
        secret: null,
        qrCodeString: null,
        password: null,
        complete: true,
        errors: [],
    },
    password: {
        setting: false,
        outdated: false,
        errors: [],
    },
};

export default function reducer(state = initialState, action) {
    if (action.type === types.AUTHENTICATION_SIGN_IN_CHECK) {
        return {
            ...state,
            signIn: {
                ...state.signIn,
                checking: true,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_SIGN_IN_CHECK_ERROR) {
        return {
            ...state,
            signIn: {
                ...state.signIn,
                checking: false,
                errors: action.errors,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_SIGN_IN_COMPLETE) {
        return {
            ...state,
            signIn: {
                ...state.signIn,
                checking: false,
                complete: true,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_SIGN_IN_FAILED) {
        return {
            ...state,
            signIn: {
                ...state.signIn,
                complete: false,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_ENABLED) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                enabled: true,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_DISABLED) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                enabled: false,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_CONNECT_DATA) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                secret: action.secret,
                qrCodeString: action.qrCodeString,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_CONNECT) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                connecting: true,
                errors: [],
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_CONNECT_ERROR) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                connecting: false,
                errors: action.errors,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_CHECK) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                password: action.password,
                checking: true,
                errors: [],
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_CHECK_ERROR) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                checking: false,
                errors: action.errors,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_COMPLETE) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                checking: false,
                complete: true,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_TWO_FACTOR_FAILED) {
        return {
            ...state,
            twoFactor: {
                ...state.twoFactor,
                checking: false,
                complete: false,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_PASSWORD_OUTDATED) {
        return {
            ...state,
            password: {
                ...state.password,
                outdated: true,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_SET_PASSWORD) {
        return {
            ...state,
            password: {
                ...state.password,
                setting: true,
                errors: [],
            },
        };
    }

    if (action.type === types.AUTHENTICATION_SET_PASSWORD_ERROR) {
        return {
            ...state,
            password: {
                ...state.password,
                setting: false,
                errors: action.errors,
            },
        };
    }

    if (action.type === types.AUTHENTICATION_PASSWORD_UPDATED) {
        return {
            ...state,
            password: {
                ...state.password,
                setting: false,
                outdated: false,
            },
        };
    }

    return state;
}
