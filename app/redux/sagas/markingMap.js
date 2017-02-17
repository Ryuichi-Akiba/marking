import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    INIT_CURRENT_LOCATION,
    successInitCurrentLocation,
    failureInitCurrentLocation,
    CLEAR_WATCH_ID,
    successClearWatchID,
    failureClearWatchID,
} from '../reducers/markingMap'
import {
    getCurrentRegion,
    getWatchId,
} from '../../logic/geolocation'

export function* handleInitCurrentLocation() {
    while (true) {
        const action = yield take(INIT_CURRENT_LOCATION);
        const {payload, error} = yield call(getCurrentRegion);

        if (payload && !error) {
            yield put(successInitCurrentLocation(payload));
        } else {
            yield put(failureInitCurrentLocation(error));
        }
    }
}

export function* handleClearWatchID() {
    while (true) {
        const action = yield take(CLEAR_WATCH_ID);
        const {payload, error} = yield call(getWatchId);

        if (payload && !error) {
            yield put(successClearWatchID(payload));
        } else {
            yield put(failureClearWatchID(error));
        }
    }
}