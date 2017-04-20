import {call, put, take} from 'redux-saga/effects'
import {getPetsMarkings} from '../../common/api/pets'
import {deleleMePets} from '../../common/api/me'
import {failureCallApi} from '../../redux/reducers/common'
import {
  INITIALIZE_PET_DETAIL_SCENE,
  successGetMarkings,
  ARCHIVE_PET,
  successArchivePet,
} from '../../redux/reducers/petDetail'

// INITIALIZE_PET_DETAIL_SCENEをフックして、指定年月のペットのマーキング情報を取得する
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

// ARCHIVE_PETをフックして、ペットをアーカイブする処理を呼び出す
export function* handleArchivePet() {
  while (true) {
    const action = yield take(ARCHIVE_PET);
    const petId = action.payload.id;
    const {payload, error} = yield call(deleleMePets, petId);
    if (payload && !error) {
      yield put(successArchivePet(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
