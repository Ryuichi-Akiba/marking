import {call, put, take} from 'redux-saga/effects'
import {loadMyPets} from '../../logic/pet'
import {failureCallApi} from '../reducers/root'
import {
  INITIALIZE_ARCHIVES_SCENE,
  successGetMyPets,
} from '../reducers/archives'

/**
 * アーカイブシーンの初期化時（ArchivesScene#INITIALIZE_ARCHIVES_SCENE）にキャッシュから飼育しているペット情報を取得する.
 */
export function* handleInitializeArchivesScene() {
  while (true) {
    yield take(INITIALIZE_ARCHIVES_SCENE);
    const {payload, error} = yield call(loadMyPets);
    if (payload && !error) {
      yield put(successGetMyPets(payload.filter((pet) => pet.dead === '1')));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
