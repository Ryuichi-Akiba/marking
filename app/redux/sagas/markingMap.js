import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    GET_CURRENT_LOCATION,
    successGetCurrentLocation,
    failureGetCurrentLocation,
    INIT_WATCH_ID,
    successInitWatchId,
    failureInitWatchId,
    CLEAR_LOCATION_WATCH,
    successClearLocationWatch,
    failureClearLocationWatch,
    SHOW_MY_PETS,
    successShowMyPets,
    failureShowMyPets,
} from '../reducers/markingMap'
import {
    getCurrentRegion,
    getWatchId,
    clearWatchId,
} from '../../logic/geolocation'
import {
    loadMyPets,
} from '../../logic/pet'

export function* handleInitCurrentLocation() {
    while (true) {
        const action = yield take(GET_CURRENT_LOCATION);
        const {payload, error} = yield call(getCurrentRegion);

        if (payload && !error) {
            yield put(successGetCurrentLocation(payload));
        } else {
            yield put(failureGetCurrentLocation(error));
        }
    }
}

export function* handleInitWatchId() {
    while (true) {
        const action = yield take(INIT_WATCH_ID);
        const {payload, error} = yield call(getWatchId);

        if (payload && !error) {
            yield put(successInitWatchId(payload));
        } else {
            yield put(failureInitWatchId(error));
        }
    }
}

export function* handleClearLocationWatch() {
    while (true) {
        const action = yield take(CLEAR_LOCATION_WATCH);
        const {payload, error} = yield call(clearWatchId, action.payload)

        if (payload && !error) {
            yield put(successClearLocationWatch(payload));
        } else {
            yield put(failureClearLocationWatch(error));
        }
    }
}

export function* handleShowMyPets() {
    while (true) {
        const action = yield take(SHOW_MY_PETS);
        const {payload, error} = yield call(loadMyPets);

        if (payload && !error) {
            yield put(successShowMyPets(payload));
        } else {
            yield put(failureShowMyPets(error));
        }
    }
}