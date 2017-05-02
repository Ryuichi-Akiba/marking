import {Record} from 'immutable';
import {createAction} from 'redux-actions'

// -------------------- ActionCreator の定義 --------------------

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
export const SHOW_MESSAGE = 'App/Common/SHOW_MESSAGE';
export const showMessage = createAction(SHOW_MESSAGE, (payload) => payload);

// エラーメッセージを表示するアクション
export const SHOW_ERRORS = 'App/Common/SHOW_ERRORS';
export const showErrors = createAction(SHOW_ERRORS, (payload) => payload);

// エラーメッセージ等を全てクリアするアクション
export const CLEAR_ERRORS = 'App/Common/CLEAR_ERRORS';
export const clearErrors = createAction(CLEAR_ERRORS);

// -------------------- Immutable State Model の定義 --------------------
export const CommonRecord = new Record({
  // 他のシーンやAPIのコールで発生したエラー情報を積み上げておくためのストア
  errors: [],
  // 他のシーンでメッセージを表示したい時に、表示するメッセージを積むためのストア
  message: null,
});

// -------------------- Reducer の定義 --------------------
export function commonReducer(state = new CommonRecord(), action) {
  switch (action.type) {
    // エラーをステートに保存して他から使えるようにしておく
    case FAILURE_CALL_API:
      if (action.error) {
        const current = state.get('errors');
        var errors = [].concat(current);
        errors.push(action.meta.error.data);
        return state.set('errors', errors);
      }
      return state;

    // 表示するメッセージをステートに保存する
    case SHOW_MESSAGE:
      return state.set('message', action.payload);

    // 表示するエラーメッセージをステートに保存する
    case SHOW_ERRORS:
      return state.set('errors', action.payload);

    // ストアが保持しているエラーをクリアする
    case CLEAR_ERRORS:
      return state.set('errors', []).set('message', null);

    default:
      return state;
  }
}
