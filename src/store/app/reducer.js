import * as types from './actionTypes';

const initialState = {
    loading: true,
    project: 0,
    tz: 'Europe/Moscow',
};

export default function (state = initialState, action) {
    if (action.type === types.APP_STARTED) {
        return state;
    }

    if (action.type === types.APP_LOADED) {
        return {
            ...state,
            loading: false,
        };
    }

    if (action.type === types.APP_SET_PROJECT) {
        return {
            ...state,
            project: action.project,
        };
    }

    if (action.type === types.APP_SET_TIMEZONE) {
        return {
            ...state,
            tz: action.tz,
        };
    }

    return state;
}
