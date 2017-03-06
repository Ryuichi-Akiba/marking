import {call, put, take} from 'redux-saga/effects'
import {postMePets} from '../../common/api/me'
import {
  ADD_MY_PET,
  successPostMyPet,
  failureCallApi
} from '../reducers/addMyPetForm'

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
