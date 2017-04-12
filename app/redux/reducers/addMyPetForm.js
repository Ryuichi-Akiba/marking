import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------

export function initialize(enableSkip : boolean) {
  if (enableSkip) {
    return initializeSkipPetForm();
  } else {
    return initializePetForm();
  }
}

// ペット登録ページのコンテナを初期化するアクション（スキップできない）
export const INITIALIZE_PET_FORM_SCENE = 'INITIALIZE_PET_FORM_SCENE';
export const initializePetForm = createAction(INITIALIZE_PET_FORM_SCENE);

// ペット登録ページのコンテナを初期化するアクション（自動的にスキップされるケースあり）
export const INITIALIZE_SKIP_PET_FORM_SCENE = 'INITIALIZE_SKIP_PET_FORM_SCENE';
export const initializeSkipPetForm = createAction(INITIALIZE_SKIP_PET_FORM_SCENE);

// ペット取得に成功した時のアクション
export const SUCCESS_GET_MY_PETS = 'SUCCESS_GET_MY_PETS';
export const successGetMyPets = createAction(SUCCESS_GET_MY_PETS, (payload) => payload);

export const ADD_MY_PET = 'ADD_MY_PET';
export function addMyPet(values) {
  // APIに合うようにフォームをトランスフォームする
  values.sex = values.sex.value;
  values.user = {};
  return {
    type: ADD_MY_PET,
    payload: values,
    meta: {},
    error: false
  }
}

// ペットを追加処理するためにイメージのアプロードに成功した時のアクション
export const SUCCESS_UPLOAD_MY_PETS = 'SUCCESS_UPLOAD_MY_PETS';
export const successUploadMyPets = createAction(SUCCESS_UPLOAD_MY_PETS, (payload) => payload);

// ペットの登録に成功した時のアクション
export const SUCCESS_POST_MY_PETS = 'SUCCESS_POST_MY_PETS';
export const successPostMyPets = createAction(SUCCESS_POST_MY_PETS, (payload) => payload);

// ペットの登録に成功した時のアクション
export const SUCCESS_RELOAD_MY_PETS = 'SUCCESS_RELOAD_MY_PETS';
export const successReloadMyPets = createAction(SUCCESS_RELOAD_MY_PETS, (payload) => payload);

// -------------------- Immutable State Model の定義 --------------------
export const AddMyPetFormRecord = new Record({
  skip: false,
  created: false,
});

// -------------------- Reducer の定義 --------------------
export function addMyPetForm(state = new AddMyPetFormRecord(), action) {
  switch (action.type) {
    case SUCCESS_GET_MY_PETS:
      return state.set('skip', (action.payload && 0 < action.payload.length));

    case SUCCESS_POST_MY_PETS:
    case SUCCESS_RELOAD_MY_PETS:
      return state.set('created', true);

    default:
      return state;
  }
}
