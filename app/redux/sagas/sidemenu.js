import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import Session from '../../common/auth/Session'
import {PETS} from '../../common/auth/sessionKey'
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

/**
 * Menu#INITIALIZE_MENU_CONTAINERをハンドルしてペット情報を取得する.
 */
export function* handleInitializeMenuContainer() {
  while (true) {
    yield take(INITIALIZE_MENU_CONTAINER);
    const {payload, error} = yield call(loadMePetsIfUseExistsCache);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

/**
 * ログインユーザーのペットの一覧を取得する. ログインしている場合はキャッシュにペット一覧があればキャッシュから取得する.
 * @returns {Promise.<TResult>|Promise<R2|R1>|*|Promise.<U>|Promise<R>}
 */
function loadMePetsIfUseExistsCache() {
  return Session.isLoggedIn().then((isLoggedIn) => {
    if (isLoggedIn) {
      // ログインしている場合はセッションかAPI経由でペット一覧を取得する
      return Session.get(PETS).then(pets => {
        if (!!pets && pets.length > 0) {
          console.log('getting user pets information from cache.', pets);
          return {payload: pets};
        } else {
          console.log('getting user pets information from api.');
          return getMePets();
        }
      });
    } else {
      // ログインしていない場合はペット一覧は空にする
      return Promise.resolve([]);
    }
  });
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
