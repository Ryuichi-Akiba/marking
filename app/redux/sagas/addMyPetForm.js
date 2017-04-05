import {call, put, take} from 'redux-saga/effects'
import {postMePets} from '../../common/api/me'
import {
  failureCallApi,
} from '../reducers/common'
import {
  INITIALIZE_PET_FORM_SCENE,
  ADD_MY_PET,
  successPostMyPet,
  successGetMyPets,
} from '../reducers/addMyPetForm'
import {loadMyPets} from '../../logic/pet'

export function* handleInitializePetFormScene() {
  while (true) {
    yield take(INITIALIZE_PET_FORM_SCENE);
    const {payload, error} = yield call(loadMyPets);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

/**
 * ADD_MY_PETをハンドルして、ペットを追加するAPIをコールする.
 */
export function* handleRequestPostMyPet() {
  while (true) {
    const action = yield take(ADD_MY_PET);
    const {payload, error} = yield call(postMePets, action.payload);
    if (payload && !error) {
      yield put(successPostMyPet(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
