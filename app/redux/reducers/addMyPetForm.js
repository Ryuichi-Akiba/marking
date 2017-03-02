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

// マイペットの登録成功時のアクション
export const SUCCESS_POST_MY_PET = 'SUCCESS_POST_MY_PETS';
export function successPostMyPet(payload) {
  return {
    type: SUCCESS_POST_MY_PET,
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
  form: {}
});

// -------------------- Reducer の定義 --------------------
export function addMyPetForm(state = new AddMyPetFormRecord(), action) {
  switch (action.type) {
    // 画面復旧時にリハイドレートする
    case REHYDRATE:
      return new AddMyPetFormRecord(action.payload.addMyPetForm);

    case FAILURE_CALL_API:
      // TODO ここにエラー処理を書く（共通処理にしたいのでユーティリティ化する／ひとまずは自動ログアウトして再ログインを促すのが無難かな）
      console.error(action.error);

    default:
      return state;
  }
}
