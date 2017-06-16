import {call, put, take} from 'redux-saga/effects'
import {getPetsMarkingsByMonth} from '../../common/api/pets'
import {failureCallApi} from '../../redux/reducers/root'
import {
  GET_WALKING_TIMES,
  successGetWalkingTimes,
} from '../reducers/graph'

// GET_WALKING_TIMESをフックして、指定日付のペットのマーキング情報を取得する
export function* handleGetPetsMarkingByMonth() {
  while (true) {
    const action: object = yield take(GET_WALKING_TIMES);
    const petId: string = action.payload.pet.id;
    const date: Date = action.payload.date;
    const {payload, error} = yield call(getPetsMarkingsByMonth, petId, date.getFullYear(), date.getMonth() + 1);
    if (payload && !error) {
      yield put(successGetWalkingTimes(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
