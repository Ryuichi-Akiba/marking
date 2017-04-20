import {call, put, take} from 'redux-saga/effects'
import {getPetsMarkings} from '../../common/api/pets'
import {failureCallApi} from '../../redux/reducers/common'
import {
  INITIALIZE_PET_DETAIL_SCENE,
  successGetMarkings,
} from '../../redux/reducers/petDetail'

export function* handleInitializePetDetailScene() {
  while (true) {
    const action = yield take(INITIALIZE_PET_DETAIL_SCENE);
    const petId = action.payload.pet.id;
    const date = action.payload.date;
    const {payload, error} = yield call(getPetsMarkings, petId, date.getFullYear(), date.getMonth() + 1);
    if (payload && !error) {
      yield put(successGetMarkings(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
