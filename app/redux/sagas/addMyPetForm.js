import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {getMePets} from '../../common/api/me'
import {
  INITIALIZE_MY_PETS_CONTAINER,
  successGetMyPets,
  failureCallApi
} from '../reducers/myPets'

export function* handleRequestGetMePets() {
  while (true) {
    yield take(INITIALIZE_MY_PETS_CONTAINER);
    const {payload, error} = yield call(getMePets);
    if (payload && !error) {
      console.log(payload);
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
