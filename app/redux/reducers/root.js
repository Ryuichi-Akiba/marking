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

export const BLOCK_SCENE = 'App/Root/BLOCK_SCENE';
export const blockScene = createAction(BLOCK_SCENE);
export const UNBLOCK_SCENE = 'App/Root/UNBLOCK_SCENE';
export const unblockScene = createAction(UNBLOCK_SCENE);

// API呼び出し失敗時のアクション
export const FAILURE_CALL_API = 'App/Common/FAILURE_CALL_API';
export function failureCallApi(error) {
  return {
    type: FAILURE_CALL_API,
    payload: {},
    meta: {error},
    error: true
  }
}

// メッセージを表示するアクション
// @Deprecated
export const SHOW_MESSAGE = 'App/Root/SHOW_MESSAGE';
export const showMessage = createAction(SHOW_MESSAGE, (payload) => payload);

// エラーメッセージを表示するアクション
export const SHOW_ERRORS = 'App/Root/SHOW_ERRORS';
export const showErrors = createAction(SHOW_ERRORS, (payload) => payload);

// エラーメッセージ等を全てクリアするアクション
export const CLEAR = 'App/Root/CLEAR';
export const clear = createAction(CLEAR);


// -------------------- Immutable State Model の定義 --------------------

export const RootRecord = new Record({
  // フェイスブックログイン済みであることを示すフラグ
  isFacebookLogin: false,
  // 処理中であることを示すフラグ
  isLoading: false,
  // 画面をブロック中であることを示すフラグ
  isBlocking: false,

  // 他のシーンやAPIのコールで発生したエラー情報を積み上げておくためのストア
  errors: [],
  // 他のシーンでメッセージを表示したい時に、表示するメッセージを積むためのストア
  message: null,
});

// -------------------- Reducer の定義 --------------------

export function rootReducer(state = new RootRecord(), action) {
  switch (action.type) {
    case INITIALIZE_ROOT_SCENE:
    case VIEW_LOADING_SCENE:
      return state.set('isLoading', true);

    case ALREADY_LOGGED_IN_FACEBOOK:
      return state.set('isFacebookLogin', true);

    case SUCCESS_INITIALIZE_ROOT_SCENE:
    case DESTROY_LOADING_SCENE:
      return state.set('isLoading', false);

    case BLOCK_SCENE:
      return state.set('isBlocking', true);
    case UNBLOCK_SCENE:
      return state.set('isBlocking', false);

    // 表示するメッセージをステートに保存する
    case SHOW_MESSAGE:
      return state.set('message', action.payload);

    // 表示するエラーメッセージをステートに保存する
    case SHOW_ERRORS:
      return state.set('errors', action.payload);

    // ストアが保持しているエラーをクリアする
    case CLEAR:
      return state.set('errors', []).set('message', null);

    // エラーをステートに保存して他から使えるようにしておく
    case FAILURE_CALL_API:
      console.error(action);
      if (action.error) {
        const error = action.meta.error;
        const current = state.get('errors');
        var errors = [].concat(current);
        errors.push(error.data);
        return state.set('errors', errors);
      }
      return state;

    default:
      return state;
  }
}
