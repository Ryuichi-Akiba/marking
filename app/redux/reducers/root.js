import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------
// ルートシーンを初期化するアクション（SAGAでログイン有無判定を行うためのトリガー）
export const INITIALIZE_ROOT_SCENE = 'INITIALIZE_ROOT_SCENE';
export const initializeRootScene = createAction(INITIALIZE_ROOT_SCENE);

// フェイスブックログインが既に完了している場合のアクション
export const ALREADY_LOGGED_IN_FACEBOOK = 'ALREADY_LOGGED_IN_FACEBOOK';
export const alreadyLoggedInFacebook = createAction(ALREADY_LOGGED_IN_FACEBOOK, (token) => token);

// ルートシーンの初期化完了後のアクション
export const SUCCESS_INITIALIZE_ROOT_SCENE = 'SUCCESS_INITIALIZE_ROOT_SCENE';
export const successInitializeRootScene = createAction(SUCCESS_INITIALIZE_ROOT_SCENE);

// ローディング用シーンをオープンするアクション
export const VIEW_LOADING_SCENE = 'VIEW_LOADING_SCENE';
export const viewLoadingScene = createAction(VIEW_LOADING_SCENE);

// ローディング用シーンをクローズするアクション
export const DESTROY_LOADING_SCENE = 'DESTROY_LOADING_SCENE';
export const destroyLoadingScene = createAction(DESTROY_LOADING_SCENE);

// -------------------- Immutable State Model の定義 --------------------

export const RootRecord = new Record({
  // フェイスブックログイン済みであることを示すフラグ
  isAlreadyLoggedInFacebook: false,
  facebookToken: null,
  // 処理中であることを示すフラグ
  isLoading: false,
});

// -------------------- Reducer の定義 --------------------

export function rootReducer(state = new RootRecord(), action) {
  switch (action.type) {
    case INITIALIZE_ROOT_SCENE:
    case VIEW_LOADING_SCENE:
      return state.set('isLoading', true);

    case ALREADY_LOGGED_IN_FACEBOOK:
      return state
        .set('isAlreadyLoggedInFacebook', true)
        .set('facebookToken', action.payload);

    case SUCCESS_INITIALIZE_ROOT_SCENE:
    case DESTROY_LOADING_SCENE:
      return state.set('isLoading', false);

    default:
      return state;
  }
}
