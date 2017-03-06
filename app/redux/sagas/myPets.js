import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {getMePets} from '../../common/api/me'
import {
  INITIALIZE_MY_PETS_CONTAINER,
  successGetMyPets,
  failureCallApi
} from '../reducers/myPets'
import {
  SUCCESS_POST_MY_PETS
} from '../reducers/addMyPetForm'


export function* handleRequestGetMePets() {
  while (true) {
    yield take(INITIALIZE_MY_PETS_CONTAINER);
    const {payload, error} = yield call(getMePets);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

/**
 * AddMyPetForm#SUCCESS_POST_MY_PETSをハンドルして、ペット情報を再取得する.
 */
export function* handleRequestSuccessPostMePets() {
  while (true) {
    yield take(SUCCESS_POST_MY_PETS);
    const {payload, error} = yield call(getMePets);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
