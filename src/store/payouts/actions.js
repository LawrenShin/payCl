import * as types from './actionTypes';

export const payoutsFetched = items => ({
    type: types.PAYOUTS_FETCHED,
    items,
});

export const filterId = id => ({
    type: types.PAYOUTS_FILTER_ID,
    id,
});

export const filterExternalId = externalId => ({
    type: types.PAYOUTS_FILTER_EXTERNAL_ID,
    externalId,
});

export const filterMethod = method => ({
    type: types.PAYOUTS_FILTER_METHOD,
    method,
});

export const filterSystem = system => ({
    type: types.PAYOUTS_FILTER_SYSTEM,
    system,
});

export const filterArn = arn => ({
    type: types.PAYOUTS_FILTER_ARN,
    arn,
});

export const filterState = state => ({
    type: types.PAYOUTS_FILTER_STATE,
    state,
});

export const filterPeriod = period => ({
    type: types.PAYOUTS_FILTER_PERIOD,
    period,
});

export const filterConfirmPeriod = confirmPeriod => ({
    type: types.PAYOUTS_FILTER_CONFIRM_PERIOD,
    confirmPeriod,
});

export const filterReset = () => ({
    type: types.PAYOUTS_FILTER_RESET,
});

export const setFilter = filter => ({
    type: types.PAYOUTS_FILTER_SET,
    filter,
});

export const filterApply = page => ({
    type: types.PAYOUTS_FILTER_APPLY,
    page,
});

export const setPagination = pagination => ({
    type: types.PAYOUTS_PAGINATION,
    pagination,
});

const createAction = type => (params, callback) => ({
    type,
    params,
    callback,
});

export const accept = createAction(types.PAYOUTS_ACCEPT);
export const decline = createAction(types.PAYOUTS_DECLINE);
export const start = createAction(types.PAYOUTS_START);
export const checkStatus = createAction(types.PAYOUTS_CHECK_STATUS);
export const delay = createAction(types.PAYOUTS_DELAY);
export const setAnyState = createAction(types.PAYOUTS_SET_ANY_STATE);
export const checkFraudStart = createAction(types.PAYOUTS_CHECK_FRAUD_START);
export const checkFraudResult = createAction(types.PAYOUTS_CHECK_FRAUD_RESULT);
export const toRecreate = createAction(types.PAYOUTS_TO_RECREATE);
export const recreate = createAction(types.PAYOUTS_RECREATE);

export const lockActions = () => ({
    type: types.PAYOUTS_LOCK_ACTIONS,
});

export const unlockActions = () => ({
    type: types.PAYOUTS_UNLOCK_ACTIONS,
});
