import * as types from './actionTypes';

export const paymentsFetched = items => ({
    type: types.PAYMENTS_FETCHED,
    items,
});

export const filterId = id => ({
    type: types.PAYMENTS_FILTER_ID,
    id,
});

export const filterExternalId = externalId => ({
    type: types.PAYMENTS_FILTER_EXTERNAL_ID,
    externalId,
});

export const filterMethod = method => ({
    type: types.PAYMENTS_FILTER_METHOD,
    method,
});

export const filterSystem = system => ({
    type: types.PAYMENTS_FILTER_SYSTEM,
    system,
});

export const filterArn = arn => ({
    type: types.PAYMENTS_FILTER_ARN,
    arn,
});

export const filterState = state => ({
    type: types.PAYMENTS_FILTER_STATE,
    state,
});

export const filterPeriod = period => ({
    type: types.PAYMENTS_FILTER_PERIOD,
    period,
});

export const filterConfirmPeriod = confirmPeriod => ({
    type: types.PAYMENTS_FILTER_CONFIRM_PERIOD,
    confirmPeriod,
});

export const filterReset = () => ({
    type: types.PAYMENTS_FILTER_RESET,
});

export const setFilter = filter => ({
    type: types.PAYMENTS_FILTER_SET,
    filter,
});

export const filterApply = page => ({
    type: types.PAYMENTS_FILTER_APPLY,
    page,
});

export const setPagination = pagination => ({
    type: types.PAYMENTS_PAGINATION,
    pagination,
});

export const lockActions = () => ({
    type: types.PAYMENTS_LOCK_ACTIONS,
});

export const unlockActions = () => ({
    type: types.PAYMENTS_UNLOCK_ACTIONS,
});

const createAction = type => (params, callback) => ({
    type,
    params,
    callback,
});

export const setAnyState = createAction(types.PAYMENTS_SET_ANY_STATE);
export const checkStatus = createAction(types.PAYMENTS_CHECK_STATUS);
export const projectNotify = createAction(types.PAYMENTS_PROJECT_NOTIFY);
export const refundPayment = createAction(types.PAYMENTS_REFUND_PAYMENT);
