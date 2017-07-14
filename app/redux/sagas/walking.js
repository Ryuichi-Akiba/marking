import {call, put, take} from 'redux-saga/effects'
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
    getCurrentRegion,
} from '../../logic/geolocation'

// マーカーを追加した時に、保存情報に現在地を保持させる
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

// 散歩情報を保存する
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
