import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------
export const GET_WALKING_TIMES = 'App/Graph/GET_WALKING_TIMES';
export const getWalkingTimes = createAction(GET_WALKING_TIMES);

export const SUCCESS_GET_WALKING_TIMES = 'App/Graph/SUCCESS_GET_WALKING_TIMES';
export const successGetWalkingTimes = createAction(SUCCESS_GET_WALKING_TIMES);

// -------------------- Immutable State Model の定義 --------------------

export const GraphRecord = new Record({
  walkingTimes: [],
});

// -------------------- Reducer の定義 --------------------

export function graphReducer(state = new GraphRecord(), action) {
  switch (action.type) {
    // グラフに描画する散歩時間のデータを保持する
    case SUCCESS_GET_WALKING_TIMES:
      return state.set('walkingTimes', action.payload);

    // デフォルト
    default:
      return state;
  }
}
