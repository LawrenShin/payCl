import {
    takeLatest,
    put,
    call,
    select,
} from 'redux-saga/effects';
import * as types from '@client/store/app/actionTypes';
import { dictionaryFetched } from '@client/store/dictionary';
import { appLoaded, setProject } from '@client/store/app';
import { api } from '@client/helpers';

function* initialFetch() {
    const dictionary = yield call([api, 'get'], '/dictionary');

    if (dictionary) {
        const selectedProject = yield select(state => state.app.project);
        const defaultProject = dictionary.data.projects.length > 0
            ? dictionary.data.projects[0].id
            : 0;

        yield put(dictionaryFetched(dictionary.data));

        if (selectedProject === 0) {
            yield put(setProject(defaultProject));
        }
    }

    yield put(appLoaded());
}

export default function* () {
    yield takeLatest(types.APP_STARTED, initialFetch);
}
