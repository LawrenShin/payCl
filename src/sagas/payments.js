/* eslint-disable */
import {
    takeEvery,
    select,
    call,
    put,
} from 'redux-saga/effects';
import qs from 'querystring';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { message } from 'antd';
import { cleanOptions } from '@client/helpers';
import * as paymentTypes from '@client/store/payments/actionTypes';
import * as appTypes from '@client/store/app/actionTypes';
import {
    paymentsFetched,
    setPagination,
    filterReset,
    filterApply,
    setFilter,
    lockActions,
    unlockActions,
} from '@client/store/payments/actions';
import { api } from '@client/helpers';

function* fetchPayments() {
    const { pathname } = yield select(state => state.router.location);
    const filter = yield select(state => state.payments.filter);

    yield put(push({
        pathname,
        search: qs.stringify(cleanOptions(filter)),
    }));

    const { data, meta } = yield call([api, 'get'], '/payment', filter);

    yield put(paymentsFetched(data));
    yield put(setPagination(meta));
}

function* projectChanged() {
    const pathname = yield select(state => state.router.location.pathname);
    if (pathname === '/projects') {
        yield put(filterReset());
        yield put(filterApply());
    }
}

function* applyQuery(action) {
    const { payload: { location, isFirstRendering } } = action;

    if (location.pathname === '/payments' && isFirstRendering) {
        const urlOptions = qs.parse(location.search.slice(1));

        if (Object.keys(urlOptions).length > 0) {
            yield put(setFilter(urlOptions));
        }
    }
}

function actionProcess(apiAction, successMessage) {
    return function* actionProcessWithAction({ callback, params }) {
        yield put(lockActions());

        const { errors } = yield call(...apiAction, params);

        callback();

        yield put(unlockActions());

        if (errors && errors.length) {
            errors.map(error => message.error(error));
        } else {
            message.success(successMessage);
        }
    };
}

const setAnyStateProcess = actionProcess(
    [[api, 'post'], '/payment/set-any-state'],
    'Статус установлен',
);
const checkStatusProcess = actionProcess(
    [[api, 'post'], '/payment/check'],
    'Запрос на проверку статуса отправлен',
);
const projectNotifyProcess = actionProcess(
    [[api, 'post'], '/payment/notify-project'],
    'Проект уведомлен',
);
const refundPaymentProcess = actionProcess(
    [[api, 'post'], '/payment/refund-payment'], // ?? endpoint
    'Проект уведомлен',
);

export default function* () {
    yield takeEvery(LOCATION_CHANGE, applyQuery);
    yield takeEvery(appTypes.APP_SET_PROJECT, projectChanged);
    yield takeEvery(paymentTypes.PAYMENTS_FILTER_APPLY, fetchPayments);
    yield takeEvery(paymentTypes.PAYMENTS_SET_ANY_STATE, setAnyStateProcess);
    yield takeEvery(paymentTypes.PAYMENTS_CHECK_STATUS, checkStatusProcess);
    yield takeEvery(paymentTypes.PAYMENTS_PROJECT_NOTIFY, projectNotifyProcess);
    yield takeEvery(paymentTypes.PAYMENTS_REFUND_PAYMENT, refundPaymentProcess);
}
