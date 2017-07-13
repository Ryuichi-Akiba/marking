import {call, put, take} from 'redux-saga/effects'
import {getMeRecentlyWalkingEvents} from '../../common/api/me'
import {failureCallApi} from '../../redux/reducers/root'
import {
  GET_USER_WALKING_EVENTS,
  successGetUserWalkingEvents,
} from '../reducers/marking'

// 散歩イベントの取得指示を受けて（GET_USER_WALKING_EVENTS）、自分のペットの散歩イベントを取得する
export function* handleSuccessGetUserWalkingEvents() {
  while (true) {
    yield take(GET_USER_WALKING_EVENTS);
    const {payload, error} = yield call(getMeRecentlyWalkingEvents);
    if (payload && !error) {
      yield put(successGetUserWalkingEvents(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
