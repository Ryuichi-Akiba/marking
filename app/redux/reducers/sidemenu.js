import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------

// マイペットページのコンテナを初期化するアクション
export const INITIALIZE_MENU_CONTAINER = 'INITIALIZE_MENU_CONTAINER';
export const initialize = createAction(INITIALIZE_MENU_CONTAINER);

// マイペットの取得成功時のアクション
export const SUCCESS_GET_MY_PETS = 'SUCCESS_GET_MY_PETS';
export const successGetMyPets = createAction(SUCCESS_GET_MY_PETS, (payload) => payload);

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
      return state.set('pets', action.payload);

    default:
      return state;
  }
}
