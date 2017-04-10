import {call, put, take} from 'redux-saga/effects'
import Session from '../../common/auth/Session'
import {PETS} from '../../common/auth/sessionKey'
import {postMePets, uploadMePetsImage} from '../../common/api/me'
import {
  failureCallApi,
} from '../reducers/common'
import {
  INITIALIZE_SKIP_PET_FORM_SCENE,
  ADD_MY_PET,
  SUCCESS_UPLOAD_MY_PETS,
  SUCCESS_POST_MY_PETS,
  successGetMyPets,
  successUploadMyPets,
  successPostMyPets,
  successReloadMyPets,
} from '../reducers/addMyPetForm'
import {loadMyPets, saveMyPets} from '../../logic/pet'

export function* handleInitializeSkipPetFormScene() {
  while (true) {
    yield take(INITIALIZE_SKIP_PET_FORM_SCENE);
    const {payload, error} = yield call(loadMyPets);
    if (payload && !error) {
      yield put(successGetMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

export function* handleAddMyPet() {
  while (true) {
    const action = yield take(ADD_MY_PET);
    if (action.payload.image) {
      const {payload, error} = yield call(uploadMePetsImage, {value: action.payload.image.uri});
      if (payload && !error) {
        var added = Object.assign({}, action.payload);
        added.image = payload.url;
        yield put(successUploadMyPets(added));
      } else {
        yield put(failureCallApi(error));
      }
    } else {
      yield put(successUploadMyPets(action.payload));
    }
  }
}

export function* handleSuccessUploadMyPet() {
  while (true) {
    const action = yield take(SUCCESS_UPLOAD_MY_PETS);
    const {payload, error} = yield call(postMePets, action.payload);
    if (payload && !error) {
      yield put(successPostMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

export function* handleSuccessPostMyPet() {
  while (true) {
    yield take(SUCCESS_POST_MY_PETS);
    const {payload, error} = yield call(loadMyPets, true);
    if (payload && !error) {
      yield put(successReloadMyPets(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}
