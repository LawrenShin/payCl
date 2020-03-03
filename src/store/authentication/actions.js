import * as types from './actionTypes';

export const signInCheck = (username, password) => ({
    type: types.AUTHENTICATION_SIGN_IN_CHECK,
    username,
    password,
});

export const signInError = errors => ({
    type: types.AUTHENTICATION_SIGN_IN_CHECK_ERROR,
    errors,
});

export const signInFailed = () => ({
    type: types.AUTHENTICATION_SIGN_IN_FAILED,
});

export const signInComplete = () => ({
    type: types.AUTHENTICATION_SIGN_IN_COMPLETE,
});

export const twoFactorEnabled = () => ({
    type: types.AUTHENTICATION_TWO_FACTOR_ENABLED,
});

export const twoFactorDisabled = () => ({
    type: types.AUTHENTICATION_TWO_FACTOR_DISABLED,
});

export const twoFactorConnectData = (secret, qrCodeString) => ({
    type: types.AUTHENTICATION_TWO_FACTOR_CONNECT_DATA,
    secret,
    qrCodeString,
});

export const twoFactorConnect = password => ({
    type: types.AUTHENTICATION_TWO_FACTOR_CONNECT,
    password,
});

export const twoFactorCheck = password => ({
    type: types.AUTHENTICATION_TWO_FACTOR_CHECK,
    password,
});

export const twoFactorComplete = () => ({
    type: types.AUTHENTICATION_TWO_FACTOR_COMPLETE,
});

export const twoFactorFailed = () => ({
    type: types.AUTHENTICATION_TWO_FACTOR_FAILED,
});

export const twoFactorConnectError = errors => ({
    type: types.AUTHENTICATION_TWO_FACTOR_CONNECT_ERROR,
    errors,
});

export const twoFactorCheckError = errors => ({
    type: types.AUTHENTICATION_TWO_FACTOR_CHECK_ERROR,
    errors,
});

export const passwordOutdated = () => ({
    type: types.AUTHENTICATION_PASSWORD_OUTDATED,
});

export const setPassword = (current, updated, copied) => ({
    type: types.AUTHENTICATION_SET_PASSWORD,
    current,
    updated,
    copied,
});

export const setPasswordError = errors => ({
    type: types.AUTHENTICATION_SET_PASSWORD_ERROR,
    errors,
});

export const passwordUpdated = () => ({
    type: types.AUTHENTICATION_PASSWORD_UPDATED,
});

export const logOut = () => ({
    type: types.AUTHENTICATION_LOG_OUT,
});

export const logOutComplete = () => ({
    type: types.AUTHENTICATION_LOG_OUT_COMPLETE,
});
