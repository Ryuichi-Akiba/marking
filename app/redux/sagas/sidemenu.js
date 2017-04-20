import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {getMePets} from '../../common/api/me'
import {
  failureCallApi
} from '../reducers/common'
import {
  INITIALIZE_MENU_CONTAINER,
  successGetMyPets,
} from '../reducers/sidemenu'
import {
  SUCCESS_POST_MY_PETS
} from '../reducers/addMyPetForm'
import {loadMyPets} from '../../logic/pet'

/**
 * Menu#INITIALIZE_MENU_CONTAINERをハンドルしてペット情報を取得する.
 */
export function* handleInitializeMenuContainer() {
  while (true) {
    const action = yield take(INITIALIZE_MENU_CONTAINER);
    const reload = action.payload.reload;
    const {payload, error} = yield call(loadMyPets, reload);
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
