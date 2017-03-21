import {REHYDRATE} from 'redux-persist/constants';
import {Record} from 'immutable';

// -------------------- ActionCreator の定義 --------------------

// マイペット登録ページのコンテナを初期化するアクション
export const INITIALIZE_ADD_MY_PET_FORM = 'INITIALIZE_ADD_MY_PET_FORM';
export function initializeAddMyPetFormContainer() {
  return {
    type: INITIALIZE_ADD_MY_PET_FORM,
    payload: {},
    meta: {},
    error: false
  }
}

export const ADD_MY_PET = 'ADD_MY_PET';
export function addMyPet(values) {
  // APIに合うようにフォームをトランスフォームする
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

// API呼び出し失敗時のアクション
export const FAILURE_CALL_API = 'FAILURE_CALL_API';
export function failureCallApi(error) {
  return {
    type: FAILURE_CALL_API,
    payload: {},
    meta: {error},
    error: true
  }
}

// -------------------- Immutable State Model の定義 --------------------
export const AddMyPetFormRecord = new Record({
  created: false,
  loading: false,
  form: {}
});

// -------------------- Reducer の定義 --------------------
export function addMyPetForm(state = new AddMyPetFormRecord(), action) {
  switch (action.type) {
    // 画面復旧時にリハイドレートする
    case REHYDRATE:
      return new AddMyPetFormRecord(action.payload.addMyPetForm);

    // 登録フォームを初期化時のステート変更
    case INITIALIZE_ADD_MY_PET_FORM:
      return new AddMyPetFormRecord();

    // ペットの登録処理を開始時のステート変更
    case ADD_MY_PET:
      return state.set('loading', true);
    // ペットの登録処理完了後のステート変更
    case SUCCESS_POST_MY_PETS:
      return state.set('loading', false).set('created', true).set('form', {});

    case FAILURE_CALL_API:
      // TODO ここにエラー処理を書く（共通処理にしたいのでユーティリティ化する／ひとまずは自動ログアウトして再ログインを促すのが無難かな）
      console.error(action);
      return state.set('loading', false);

    default:
      return state;
  }
}
