import {Record} from 'immutable';

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

// -------------------- Immutable State Model の定義 --------------------
export const CommonRecord = new Record({
  errors: [],
});

// -------------------- Reducer の定義 --------------------
export function commonReducer(state = new CommonRecord(), action) {
  switch (action.type) {
    // エラーをステートに保存して他から使えるようにしておく
    case FAILURE_CALL_API:
      if (action.error) {
        var errors = state.get('errors');
        errors.push(action.meta.error.data);
        console.log(errors);
        return state.set('errors', errors);
      } else {
        return state;
      }

    default:
      return state;
  }
}
