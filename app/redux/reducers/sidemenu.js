import {REHYDRATE} from 'redux-persist/constants'
import {Record} from 'immutable'
import Session from '../../common/auth/Session'
import {PETS} from '../../common/auth/sessionKey'

// -------------------- ActionCreator の定義 --------------------

// マイペットページのコンテナを初期化するアクション
export const INITIALIZE_MENU_CONTAINER = 'INITIALIZE_MENU_CONTAINER';
export function initialize() {
  return {
    type: INITIALIZE_MENU_CONTAINER,
    payload: {},
    meta: {},
    error: false
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
    payload: {},
    meta: {},
    error: false
  }
}

// マイペットの取得成功時のアクション
export const SUCCESS_GET_MY_PETS = 'SUCCESS_GET_MY_PETS';
export function successGetMyPets(payload) {
  return {
    type: SUCCESS_GET_MY_PETS,
    payload: payload,
    meta: {response: payload},
    error: false
  }
}

// -------------------- Immutable State Model の定義 --------------------
export const MenuRecord = new Record({
  pets: []
});

// -------------------- Reducer の定義 --------------------
export function menuReducer(state = new MenuRecord(), action) {
  switch (action.type) {
    // 画面初期化時のステート変更処理
    case INITIALIZE_MENU_CONTAINER:
      return state;

    // 自分が飼育しているペットをステートに保存する
    case SUCCESS_GET_MY_PETS:
      Session.set(PETS, action.payload);
      return state.set(PETS, action.payload);

    // ログアウト
    case LOGOUT:
      Session.destroy();
      return new MenuRecord();

    default:
      return state;
  }
}
