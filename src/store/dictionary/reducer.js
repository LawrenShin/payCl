import * as types from './actionTypes';

const initialState = {
    paymentMethods: [],
    paymentSystems: [],
    projects: [],
    statesPayment: {},
    statesPayout: {},
};

export default function (state = initialState, action) {
    if (action.type === types.DICTIONARY_FETCHED) {
        return {
            ...state,
            ...action.dictionary,
        };
    }

    return state;
}
