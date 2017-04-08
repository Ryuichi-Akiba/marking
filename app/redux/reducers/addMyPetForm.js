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

// ログインユーザー
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

// マイペットの登録成功時のアクション
export const SUCCESS_POST_MY_PETS = 'SUCCESS_POST_MY_PETS';
export function successPostMyPet(payload) {
  return {
    type: SUCCESS_POST_MY_PETS,
    payload: payload,
    meta: {response: payload},
    error: false
  }
}

// -------------------- Immutable State Model の定義 --------------------
export const AddMyPetFormRecord = new Record({
  created: false,
  form: {}
});

// -------------------- Reducer の定義 --------------------
export function addMyPetForm(state = new AddMyPetFormRecord(), action) {
  switch (action.type) {
    case SUCCESS_GET_MY_PETS:
      console.log(action.payload);
      return state.set('created', (action.payload && 0 < action.payload.length));

    case SUCCESS_POST_MY_PETS:
      return state.set('created', true).set('form', {});

    default:
      return state;
  }
}
