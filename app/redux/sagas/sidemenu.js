import {call, put, take} from 'redux-saga/effects'
import {
  failureCallApi
} from '../reducers/root'
import {
  INITIALIZE_MENU_CONTAINER,
  successGetMyPets,
} from '../reducers/sidemenu'
import {
  SUCCESS_RELOAD_MY_PETS,
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
 * ペット情報が更新された後（PetForm#SUCCESS_RELOAD_MY_PETSをフック）、メニューのペット一覧を書き換えるために、ペット情報を取得する.
 */
export function* handleSuccessReloadMyPets() {
  while (true) {
    yield take(SUCCESS_RELOAD_MY_PETS);
    const {payload, error} = yield call(loadMyPets);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
