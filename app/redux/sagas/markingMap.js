import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    successInitCurrentLocation,
    failureInitCurrentLocation,
    INIT_CURRENT_LOCATION,
} from '../reducers/markingMap'
import {
    getCurrentRegion,
    getWatchId,
} from '../../logic/geolocation'

export function* handleInitCurrentLocation() {
    while (true) {
        const action = yield take(INIT_CURRENT_LOCATION);
        const {payload, error} = yield call(getWatchId);
        if (payload && !error) {
            yield put(successInitCurrentLocation(payload));
        } else {
            yield put(failureInitCurrentLocation(error));
        }
    }
}