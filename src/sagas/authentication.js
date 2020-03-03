import {
    takeEvery,
    takeLatest,
    call,
    put,
    select,
} from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { api } from '@client/helpers';
import * as authenticationTypes from '@client/store/authentication/actionTypes';
import { sessionToken } from '@client/store/session/actions';
import {
    signInComplete,
    signInError,
    twoFactorEnabled,
    twoFactorDisabled,
    twoFactorConnectData,
    twoFactorComplete,
    twoFactorCheckError,
    twoFactorConnectError,
    passwordUpdated,
    setPasswordError,
    logOutComplete,
} from '@client/store/authentication/actions';

function* signIn({ username, password }) {
    const data = {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username,
        password,
        scope: '',
    };
    const response = yield call([api, 'getToken'], data);
    const json = yield call([response, 'json']);

    if (response.status === 200) {
        // eslint-disable-next-line
        const { expires_in, access_token, refresh_token } = json;

        yield put(sessionToken(expires_in, access_token, refresh_token));
        yield put(signInComplete());

        yield put(replace('/'));
    } else {
        const { message } = json;

        yield put(signInError([message]));
    }
}

function* twoFactorConnection({ password }) {
    const secret = yield select(state => state.authentication.twoFactor.secret);
    const data = yield call([api, 'post'], '/security/otp/enable', { secret, password });

    if (data.status === 0) {
        yield put(twoFactorEnabled());
    } else {
        yield put(twoFactorConnectError([data.data.exception.message]));
    }
}

function* twoFactorConnectionCheck() {
    const data = yield call([api, 'get'], '/user/profile');

    if (data.data?.needEnableOTP) {
        yield put(twoFactorDisabled());
        yield put(twoFactorConnectData(data.data.otp.secret, data.data.otp.qr));
    } else {
        yield put(twoFactorEnabled());
    }
}

function* twoFactorChecking({ password }) {
    const data = yield call([api, 'post'], '/security/otp/check', { one_time_password: password });

    if (data.status === 0) {
        yield put(twoFactorComplete());
    } else {
        yield put(twoFactorCheckError(data.errors));
    }
}

function* updatePassword({ current, updated, copied }) {
    const data = yield call([api, 'post'], '/user/profile/change-password', {
        current_password: current,
        password: updated,
        password_confirmation: copied,
    });

    if (data.status === 0) {
        yield put(passwordUpdated());
    } else {
        yield put(setPasswordError(data.errors));
    }
}

function* unauthenticated() {
    yield put(replace('/login'));
}

function* logOut() {
    yield call([api, 'post'], '/user/profile/revoke-token');
    yield put(logOutComplete());
    yield put(replace('/login'));
}

export default function* sessionSaga() {
    yield takeEvery(authenticationTypes.AUTHENTICATION_SIGN_IN_FAILED, unauthenticated);
    yield takeEvery(authenticationTypes.AUTHENTICATION_SIGN_IN_CHECK, signIn);
    yield takeEvery(authenticationTypes.AUTHENTICATION_LOG_OUT, logOut);
    yield takeLatest([
        authenticationTypes.AUTHENTICATION_SIGN_IN_COMPLETE,
        authenticationTypes.AUTHENTICATION_TWO_FACTOR_FAILED,
    ], twoFactorConnectionCheck);
    yield takeEvery(authenticationTypes.AUTHENTICATION_TWO_FACTOR_CONNECT, twoFactorConnection);
    yield takeEvery(authenticationTypes.AUTHENTICATION_TWO_FACTOR_CHECK, twoFactorChecking);
    yield takeLatest(authenticationTypes.AUTHENTICATION_SET_PASSWORD, updatePassword);
}
