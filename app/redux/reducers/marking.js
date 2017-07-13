import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------
// 散歩イベント情報を取得するアクション
export const GET_USER_WALKING_EVENTS = 'App/Marking/GET_USER_WALKING_EVENTS';
export const getUserWalkingEvents = createAction(GET_USER_WALKING_EVENTS);
// 散歩イベント情報の取得に成功した場合のアクション
export const SUCCESS_GET_USER_WALKING_EVENTS = 'App/Marking/SUCCESS_GET_USER_WALKING_EVENTS';
export const successGetUserWalkingEvents = createAction(SUCCESS_GET_USER_WALKING_EVENTS);

// マーキングステートをクリアする
export const CLEAR = 'App/Marking/CLEAR';
export const clear = createAction(CLEAR);

// -------------------- Immutable State Model の定義 --------------------
export const GraphRecord = new Record({
  // マーキングシーンに表示するイベント
  events: [],
  // イベントの取得に成功した場合にTRUEにするフラグ
  successGetUserWalkingEvents: false,
});

// -------------------- Reducer の定義 --------------------
export function markingReducer(state = new GraphRecord(), action) {
  switch (action.type) {
    // 散歩イベント情報の取得に成功した場合、イベントを書き換える
    case SUCCESS_GET_USER_WALKING_EVENTS:
      return state.set('events', action.payload).set('successGetUserWalkingEvents', true);

    // ステートをクリアする
    case CLEAR:
      return state.set('successGetUserWalkingEvents', false);

    // デフォルト
    default:
      return state;
  }
}
