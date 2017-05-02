import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {failureCallApi} from '../reducers/common'
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
    START_MARKING,
    successStartMarking,
    failureStartMarking,
    FINISH_MARKING,
    successFinishMarking,
    failureFinishMarking,
    PEE,
    successPee,
    failurePee,
    POO,
    successPoo,
    failurePoo,
} from '../reducers/markingMap'
import {
    getCurrentRegion,
    getWatchId,
    clearWatchId,
    startMarking,
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

export function* handleStartMarking() {
    while (true) {
        const action = yield take(START_MARKING);
        const markings = {distance: 0, events: []};
        const {payload, error} = yield call(startMarking, markings, null, 'START');

        if (payload && !error) {
            yield put(successStartMarking(payload));
        } else {
            yield put(failureStartMarking(error));
        }
    }
}

export function* handleFinishMarking() {
  while (true) {
    const action = yield take(FINISH_MARKING);
    const {payload, error} = yield call(startMarking, action.payload, null, 'END');

    if (payload && !error) {
      yield put(successFinishMarking(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

export function* handlePee() {
    while (true) {
        const action = yield take(PEE);
        const {payload, error} = yield call(startMarking, action.payload, action.meta, 'PEE');

        if (payload && !error) {
            yield put(successPee(payload));
        } else {
            yield put(failurePee(error));
        }
    }
}

export function* handlePoo() {
  while (true) {
    const action = yield take(POO);
    const {payload, error} = yield call(startMarking, action.payload, action.meta, 'POO');

    if (payload && !error) {
      yield put(successPoo(payload));
    } else {
      yield put(failurePoo(error));
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