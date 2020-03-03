import * as types from './actionTypes';

const filterInitialState = {
    id: '',
    external_id: '',
    payment_method_id: 0,
    payment_system_id: 0,
    arn: '',
    state: '',
    created_at: [],
    confirmed_at: [],
};

const initialState = {
    filter: filterInitialState,
    pagination: {},
    loading: false,
    actionsLocked: false,
    shouldUpdate: false,
    items: [],
};

export default function (state = initialState, action) {
    if (action.type === types.PAYMENTS_FETCHED) {
        return {
            ...state,
            items: action.items,
            loading: false,
            shouldUpdate: false,
        };
    }

    if (action.type === types.PAYMENTS_FILTER_ID) {
        return {
            ...state,
            filter: {
                ...state.filter,
                id: action.id,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_EXTERNAL_ID) {
        return {
            ...state,
            filter: {
                ...state.filter,
                external_id: action.externalId,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_STATE) {
        return {
            ...state,
            filter: {
                ...state.filter,
                state: action.state,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_SYSTEM) {
        return {
            ...state,
            filter: {
                ...state.filter,
                payment_system_id: action.system,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_METHOD) {
        return {
            ...state,
            filter: {
                ...state.filter,
                payment_method_id: action.method,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_ARN) {
        return {
            ...state,
            filter: {
                ...state.filter,
                arn: action.arn,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_PERIOD) {
        return {
            ...state,
            filter: {
                ...state.filter,
                created_at: action.period,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_CONFIRM_PERIOD) {
        return {
            ...state,
            filter: {
                ...state.filter,
                confirmed_at: action.confirmPeriod,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_RESET) {
        return {
            ...state,
            filter: {
                ...filterInitialState,
            },
        };
    }

    if (action.type === types.PAYMENTS_FILTER_APPLY) {
        return {
            ...state,
            loading: true,
        };
    }

    if (action.type === types.PAYMENTS_PAGINATION) {
        return {
            ...state,
            pagination: action.pagination,
        };
    }

    if (action.type === types.PAYMENTS_FILTER_SET) {
        return {
            ...state,
            filter: {
                ...filterInitialState,
                ...action.filter,
            },
        };
    }

    if (action.type === types.PAYMENTS_LOCK_ACTIONS) {
        return {
            ...state,
            actionsLocked: true,
        };
    }

    if (action.type === types.PAYMENTS_UNLOCK_ACTIONS) {
        return {
            ...state,
            actionsLocked: false,
            shouldUpdate: true,
        };
    }

    return state;
}
