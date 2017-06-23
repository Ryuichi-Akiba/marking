import {call, put, take} from 'redux-saga/effects'
import {
  failureCallApi
} from '../reducers/root'
import {
  INITIALIZE_MENU_CONTAINER,
  successGetMyPets,
} from '../reducers/sidemenu'
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
