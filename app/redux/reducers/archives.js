import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------

// マイペットページのコンテナを初期化するアクション
export const INITIALIZE_ARCHIVES_SCENE = 'App/ArchivesScene/INITIALIZE_ARCHIVES_SCENE';
export const initialize = createAction(INITIALIZE_ARCHIVES_SCENE);

// マイペットの取得成功時のアクション
export const SUCCESS_GET_MY_PETS = 'App/ArchivesScene/SUCCESS_GET_MY_PETS';
export const successGetMyPets = createAction(SUCCESS_GET_MY_PETS, (payload) => payload);

// -------------------- Immutable State Model の定義 --------------------
export const ArchivesSceneRecord = new Record({
  pets: []
});

// -------------------- Reducer の定義 --------------------
export function archivesReducer(state = new ArchivesSceneRecord(), action) {
  switch (action.type) {
    // 画面初期化時のステート変更処理
    case INITIALIZE_ARCHIVES_SCENE:
      return state;

    // 自分が飼育しているペット（お亡くなりになっているペット）をステートに保存する
    case SUCCESS_GET_MY_PETS:
      return state.set('pets', action.payload);

    default:
      return state;
  }
}
