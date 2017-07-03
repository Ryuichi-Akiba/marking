import {call, put, take} from 'redux-saga/effects'
import {deleleMePets} from '../../common/api/me'
import {getPetsWalkings, getPetsWalkingsByMonth} from '../../common/api/pets'
import {loadMyPets} from '../../logic/pet'
import {failureCallApi} from '../../redux/reducers/root'
import {
  INITIALIZE_PET_DETAIL_SCENE,
  successGetWalkings,
  GET_MONTHLY_WALKINGS,
  successGetMonthlyWalkings,
  ARCHIVE_PET,
  SUCCESS_ARCHIVE_PET,
  successArchivePet,
  successReloadMyPets,
} from '../reducers/detail'

/**
 * ペット詳細情報を表示する際（PetDetail#INITIALIZE_PET_DETAIL_SCENE）、指定された日のペットの散歩情報を取得する.
 */
export function* handleInitializePetDetailScene() {
  while (true) {
    const action: object = yield take(INITIALIZE_PET_DETAIL_SCENE);
    const petId: string = action.payload.pet.id;
    const date: Date = action.payload.date;
    const {payload, error} = yield call(getPetsWalkings, petId, date.getFullYear(), date.getMonth() + 1, date.getDate());
    if (payload && !error) {
      yield put(successGetWalkings(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

export function* handleGetMonthlyWalkings() {
  while (true) {
    const action: object = yield take(GET_MONTHLY_WALKINGS);
    const petId: string = action.payload.pet.id;
    const date: Date = action.payload.date;
    const {payload, error} = yield call(getPetsWalkingsByMonth, petId, date.getFullYear(), date.getMonth() + 1);
    if (payload && !error) {
      yield put(successGetMonthlyWalkings(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

// ペットをアーカイブする指示後（PetForm#ARCHIVE_PETをフック）、ペットをアーカイブする処理を呼び出す
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

/**
 * ペット情報がアーカイブされた後（PetDetail#SUCCESS_ARCHIVE_PET）、メニューのペット一覧を書き換えるために、ペット情報を再取得する.
 */
export function* handleSuccessArchivePet() {
  while (true) {
    yield take(SUCCESS_ARCHIVE_PET);
    const {payload, error} = yield call(loadMyPets, true);
    if (payload && !error) {
      yield put(successReloadMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
