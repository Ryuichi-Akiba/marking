import {call, put, take} from 'redux-saga/effects'
import {postMePets, uploadMePetsImage, deleleMePets} from '../../common/api/me'
import {loadMyPets} from '../../logic/pet'
import {loadColors} from '../../logic/color'
import {loadBreeds} from '../../logic/breed'
import {failureCallApi} from '../reducers/root'
import {
  INITIALIZE_PET_FORM,
  successGetColors,
  successGetBreeds,
  INITIALIZE_SKIP_PET_FORM_SCENE,
  ADD_MY_PET,
  SUCCESS_UPLOAD_MY_PETS,
  SUCCESS_POST_MY_PETS,
  successGetMyPets,
  successUploadMyPets,
  successPostMyPets,
  successReloadMyPets,
  ARCHIVE_PET,
  SUCCESS_ARCHIVE_PET,
  successArchivePet,
} from '../reducers/addMyPetForm'

// フォーム初期化時に（PetForm#INITIALIZE_PET_FORMをフック）、キャッシュにある毛色一覧を取得する
export function* handleInitializePetFormForColors() {
  while (true) {
    yield take(INITIALIZE_PET_FORM);
    const {payload, error} = yield call(loadColors);
    if (payload && !error) {
      yield put(successGetColors(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

// フォーム初期化時に（PetForm#INITIALIZE_PET_FORMをフック）、キャッシュにある品種一覧を取得する
export function* handleInitializePetFormForBreeds() {
  while (true) {
    yield take(INITIALIZE_PET_FORM);
    const {payload, error} = yield call(loadBreeds);
    if (payload && !error) {
      yield put(successGetBreeds(payload));
    } else {
      yield put(failureCallApi(error));
    }
  }
}

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
    if (action.payload.image && action.payload.image.mime) {
      const {payload, error} = yield call(uploadMePetsImage, {value: action.payload.image.uri});
      if (payload && !error) {
        var added = Object.assign({}, action.payload);
        added.image = payload.url;
        yield put(successUploadMyPets(added));
      } else {
        yield put(failureCallApi(error));
      }
    } else {
      var pet = action.payload;
      if (pet.image) {
        pet.image = pet.image.uri;
      } else {
        pet.image = null;
      }
      yield put(successUploadMyPets(pet));
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

// ペットの登録後（PetForm#SUCCESS_POST_MY_PETSをフック）、キャッシュにあるペット一覧をリフレッシュする
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

// ペットのアーカイブ後（PetForm#SUCCESS_ARCHIVE_PETをフック）、キャッシュにあるペット一覧をリフレッシュする
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
