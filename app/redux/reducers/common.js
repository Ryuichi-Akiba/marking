import {Record} from 'immutable';

// -------------------- ActionCreator の定義 --------------------

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
export const CommonRecord = new Record({
});

// -------------------- Reducer の定義 --------------------
export function commonReducer(state = new CommonRecord(), action) {
  switch (action.type) {
    // TODO ここにエラー処理を書く（共通処理にしたいのでユーティリティ化する／ひとまずは自動ログアウトして再ログインを促すのが無難かな）
    case FAILURE_CALL_API:
      console.error(action);
      return state;

    default:
      return state;
  }
}
