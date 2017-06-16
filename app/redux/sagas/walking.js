import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {failureCallApi} from '../reducers/root'
import {postWalking} from '../../common/api/walkings';
import {
  ADD_MARKER,
  successAddMarker,
  failureGetCurrentLocation,
  SAVE,
  successSave,
} from '../reducers/walking'
import {
    GET_CURRENT_LOCATION,
    successGetCurrentLocation,
    INIT_WATCH_ID,
    successInitWatchId,
    failureInitWatchId,
    CLEAR_LOCATION_WATCH,
    successClearLocationWatch,
    failureClearLocationWatch,
    START_MARKING,
    successStartMarking,
    failureStartMarking,
    FINISH_MARKING,
    successFinishMarking,
    failureFinishMarking,
} from '../reducers/walking'
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

export function* handleAddMarker() {
  while (true) {
    const action = yield take(ADD_MARKER);
    const {payload, error} = yield call(getCurrentRegion, action.payload);

    if (payload && !error) {
      // 取得した位置情報をINPUT値に設定して、それを戻す
      const res = action.payload;
      res.coordinates = payload.region;
      yield put(successAddMarker(res));
    } else {
      yield put(failureGetCurrentLocation(error));
    }
  }
}

//
export function* handleSaveWalking() {
  while (true) {
    const action = yield take(SAVE);
    const {payload, error} = yield call(postWalking, action.payload);

    if (payload && !error) {
      yield put(successSave(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
