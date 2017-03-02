import {REHYDRATE} from 'redux-persist/constants';
import {Record} from 'immutable';

// -------------------- ActionCreator の定義 --------------------

// マイペットページのコンテナを初期化するアクション
export const INITIALIZE_MY_PETS_CONTAINER = 'INITIALIZE_MY_PETS_CONTAINER';
export function initializeMyPetsContainer() {
  return {
    type: INITIALIZE_MY_PETS_CONTAINER,
    payload: {},
    meta: {},
    error: false
  }
}
// マイペットの取得成功時のアクション
export const SUCCESS_GET_MY_PETS = 'SUCCESS_GET_MY_PETS';
export function successGetMyPets(payload) {
  console.log(payload);
  return {
    type: SUCCESS_GET_MY_PETS,
    payload: payload,
    meta: {response: payload},
    error: false
  }
}

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
export const MyPetsRecord = new Record({
  pets: []
});

// -------------------- Reducer の定義 --------------------
export function myPets(state = new MyPetsRecord(), action) {
  switch (action.type) {
    // 画面復旧時にリハイドレートする
    case REHYDRATE:
      return new MyPetsRecord(action.payload.myPets);

    // 自分が飼育しているペットをステートに保存する
    case SUCCESS_GET_MY_PETS:
      return state.set('pets', action.payload);

    case FAILURE_CALL_API:
      // TODO ここにエラー処理を書く（共通処理にしたいのでユーティリティ化する／ひとまずは自動ログアウトして再ログインを促すのが無難かな）
      console.log(action.error);

    default:
      return state;
  }
}
