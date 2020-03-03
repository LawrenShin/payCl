import * as types from './actionTypes';

export const sessionToken = (expires, accessToken, refreshToken) => ({
    type: types.SESSION_TOKEN,
    expires,
    accessToken,
    refreshToken,
});

export const sessionSignIn = (username, password) => ({
    type: types.SESSION_SIGN_IN,
    username,
    password,
});

export const sessionTwoFactorData = data => ({
    type: types.SESSION_TWO_FACTOR_DATA,
    data,
});
