import * as types from './actionTypes';

export const dictionaryFetched = dictionary => ({
    type: types.DICTIONARY_FETCHED,
    dictionary,
});
