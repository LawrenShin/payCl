import * as types from './actionTypes';

export const appStarted = () => ({
    type: types.APP_STARTED,
});

export const appLoaded = () => ({
    type: types.APP_LOADED,
});

export const setProject = project => ({
    type: types.APP_SET_PROJECT,
    project,
});

export const setTimezone = tz => ({
    type: types.APP_SET_TIMEZONE,
    tz,
});
