import {
    takeEvery,
    select,
    call,
    put,
} from 'redux-saga/effects';
import qs from 'querystring';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { message } from 'antd';
import { cleanOptions, api } from '@client/helpers';
import * as payoutsTypes from '@client/store/payouts/actionTypes';
import * as appTypes from '@client/store/app/actionTypes';
import {
    payoutsFetched,
    setPagination,
    filterReset,
    filterApply,
    setFilter,
    lockActions,
    unlockActions,
} from '@client/store/payouts/actions';

function* fetchPayments() {
    const { pathname } = yield select(state => state.router.location);
    const filter = yield select(state => state.payouts.filter);

    yield put(push({
        pathname,
        search: qs.stringify(cleanOptions(filter)),
    }));

    const { data, meta } = yield call([api, 'get'], '/payout', filter);

    yield put(payoutsFetched(data));
    yield put(setPagination(meta));
}

function* projectChanged() {
    const pathname = yield select(state => state.router.location.pathname);
    if (pathname === '/payouts') {
        yield put(filterReset());
        yield put(filterApply());
    }
}

function* applyQuery(action) {
    const { payload: { location, isFirstRendering } } = action;

    if (location.pathname === '/payouts' && isFirstRendering) {
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

const acceptProcess = actionProcess(
    [[api, 'post'], '/payout/processing-accept'],
    'Заявки одобрены',
);
const declineProcess = actionProcess(
    [[api, 'post'], '/payout/processing-decline'],
    'Заявки отклонены',
);
const checkStatusProcess = actionProcess(
    [[api, 'post'], '/payout/check'],
    'Запрос на проверку статуса отправлен',
);
const delayProcess = actionProcess(
    [[api, 'post'], '/payout/delay'],
    'Заявки отложены',
);
const startProcess = actionProcess(
    [[api, 'post'], '/payout/start'],
    'Заявки начаты',
);
const setAnyStateProcess = actionProcess(
    [[api, 'post'], '/payout/set-any-state/'],
    'Статус установлен',
);
const checkFraudStartProcess = actionProcess(
    [[api, 'post'], '/payout/check-fraud-start/'], // ?? endpoint
    'Результат получен',
);
const checkFraudResultProcess = actionProcess(
    [[api, 'post'], '/payout/check-fraud-result/'], // ?? endpoint
    'Результат получен',
);
const toRecreateProcess = actionProcess(
    [[api, 'post'], '/payout/to-re-create/'],
    'Статус установлен',
);
const recreateProcess = actionProcess(
    [[api, 'post'], '/payout/re-create/'],
    'Пересоздано',
);

export default function* () {
    yield takeEvery(LOCATION_CHANGE, applyQuery);
    yield takeEvery(appTypes.APP_SET_PROJECT, projectChanged);
    yield takeEvery(payoutsTypes.PAYOUTS_FILTER_APPLY, fetchPayments);
    yield takeEvery(payoutsTypes.PAYOUTS_ACCEPT, acceptProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_DECLINE, declineProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_CHECK_STATUS, checkStatusProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_DELAY, delayProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_START, startProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_SET_ANY_STATE, setAnyStateProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_CHECK_FRAUD_START, checkFraudStartProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_CHECK_FRAUD_RESULT, checkFraudResultProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_TO_RECREATE, toRecreateProcess);
    yield takeEvery(payoutsTypes.PAYOUTS_RECREATE, recreateProcess);
}
