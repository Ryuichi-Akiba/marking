import {Record} from 'immutable'
import {Animated} from 'react-native'
import {createAction} from 'redux-actions'

// 散歩を開始する（payloadはmomentであること）
export const START_WALKING = 'App/Walking/START_WALKING';
export const startWalking = createAction(START_WALKING, (payload) => payload);

// 散歩を終了する（payloadはmomentであること）
export const END_WALKING = 'App/Walking/END_WALKING';
export const endWalking = createAction(END_WALKING, (payload) => payload);

// 一緒に散歩するペットを選択し直す
export const REPLACE_PETS = 'App/Walking/REPLACE_PETS';
export const replacePets = createAction(REPLACE_PETS, (payload) => payload);

// 散歩をキャンセルする
export const CANCEL_WALKING = 'App/Walking/CANCEL_WALKING';
export const cancelWalking = createAction(CANCEL_WALKING, (payload) => payload);

// マーキングした場所をマークするために、マーカー情報を追加する
export const ADD_MARKER = 'App/Walking/ADD_MARKER';
export const addMarker = createAction(ADD_MARKER, (payload) => payload);
// マーキングした場所を取得して、payloadに追加したものをステートに保存するアクション
export const SUCCESS_ADD_MARKER = 'App/Walking/SUCCESS_ADD_MARKER';
export const successAddMarker = createAction(SUCCESS_ADD_MARKER, (payload) => payload);

// 散歩情報を記録するアクション
export const SAVE = 'App/Walking/SAVE';
export const save = createAction(SAVE, (payload) => convert(payload));

// 現在地の取得ができなかった場合に実行するアクション
export const FAILURE_GET_CURRENT_LOCATION = 'App/Walking/FAILURE_GET_CURRENT_LOCATION';
export const failureGetCurrentLocation = createAction(FAILURE_GET_CURRENT_LOCATION, (payload) => payload);


// APIに渡して保存できるようにコンバートする
function convert(state) {
  // redux stateから必要な値を取り出す
  const {pets, markers, startDateTime, endDateTime, distance} = state;

  // 複数ペットを散歩に連れ出しているので、それぞれマーキングイベントを作成
  var list = new Array();
  pets.forEach((p) => {
    // [{petId, dateTime, eventType, geometry}]の形に変換
    var events = new Array();
    markers.forEach(m => {
      if (m.pet.id === p.id) {
        // GEO JSON形式に変換
        const coordinates = [m.coordinates.longitude, m.coordinates.latitude];
        const geometry = {type:'Point', coordinates};
        events.push({petId:p.id, dateTime:m.time.toDate(), eventType:m.type, geometry});
      }
    });

    // [{petId, startDateTime, endDateTime, distance, memo, events}]の形に変換
    list.push({petId:p.id, startDateTime:startDateTime.toDate(), endDateTime:endDateTime.toDate(), distance, memo:null, events});
  });

  console.log(list);
  return list;
}


// 散歩情報の記録に成功した場合のアクション
export const SUCCESS_SAVE = 'App/Walking/SUCCESS_SAVE';
export const successSave = createAction(SUCCESS_SAVE, (payload) => payload);


// -- 以下、保留

// 現在位置を取得するアクション
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
export function getCurrentLocation() {
  return {
    type: GET_CURRENT_LOCATION,
    payload: {},
    meta: {},
    error: false
  }
}

export const SUCCESS_GET_CURRENT_LOCATION = 'SUCCESS_GET_CURRENT_LOCATION';
export function successGetCurrentLocation(payload) {
  return {
    type: SUCCESS_GET_CURRENT_LOCATION,
    payload: payload,
    meta: {},
    error: false
  }
}

// 現在位置を更新するアクション
export const UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION';
export function updateCurrentLocation(region) {
  return {
    type: UPDATE_CURRENT_LOCATION,
    payload: region,
    meta: {},
    error: false
  }
}

// watchIDを取得するアクション
export const INIT_WATCH_ID = 'INIT_WATCH_ID';
export function initWatchId() {
  return {
    type: INIT_WATCH_ID,
    payload: null,
    meta: {},
    error: false
  }
}

export const SUCCESS_INIT_WATCH_ID = 'SUCCESS_INIT_WATCH_ID';
export function successInitWatchId(payload) {
  return {
    type: SUCCESS_INIT_WATCH_ID,
    payload: payload.watchId,
    meta: {},
    error: false
  }
}

export const FAILURE_INIT_WATCH_ID = 'FAILURE_INIT_WATCH_ID';
export function failureInitWatchId(error) {
  return {
    type: FAILURE_INIT_WATCH_ID,
    payload: null,
    meta: {error},
    error: true
  }
}

// 位置情報取得を終了するアクション
export const CLEAR_LOCATION_WATCH = 'CLEAR_LOCATION_WATCH';
export function clearLocationWatch(payload) {
  return {
    type: CLEAR_LOCATION_WATCH,
    payload: payload.watchId,
    meta: {},
    error: false
  }
}

export const SUCCESS_CLEAR_LOCATION_WATCH = 'SUCCESS_CLEAR_LOCATION_WATCH';
export function successClearLocationWatch(payload) {
  return {
    type: SUCCESS_CLEAR_LOCATION_WATCH,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_CLEAR_LOCATION_WATCH = 'FILURE_CLEAR_LOCATION_WATCH';
export function failureClearLocationWatch(error) {
  return {
    type: FAILURE_CLEAR_LOCATION_WATCH,
    payload: null,
    meta: {error},
    error: true
  }
}

// -- 以下、不要な気がする

// 散歩の開始時に呼び出すアクション
export const START_MARKING = 'START_MARKING';
export function startMarking(payload) {
  return {
    type: START_MARKING,
    payload: payload,
    meta: {},
    error: false
  }
}

export const SUCCESS_START_MARKING = 'SUCCESS_START_MARKING';
export function successStartMarking(payload) {
  return {
    type: SUCCESS_START_MARKING,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_START_MARKING = 'FAILURE_START_MARKING';
export function failureStartMarking(error) {
  return {
    type: FAILURE_START_MARKING,
    payload: {},
    meta: {error},
    error: true
  }
}

// 散歩の終了時に呼び出すアクション
export const FINISH_MARKING = 'FINISH_MARKING';
export function finishMarking(payload) {
  return {
    type: FINISH_MARKING,
    payload: payload,
    meta: {},
    error: false
  }
}

export const SUCCESS_FINISH_MARKING = 'SUCCESS_FINISH_MARKING';
export function successFinishMarking(payload) {
  return {
    type: SUCCESS_FINISH_MARKING,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_FINISH_MARKING = 'FAILURE_FINISH_MARKING';
export function failureFinishMarking(error) {
  return {
    type: FAILURE_FINISH_MARKING,
    payload: {},
    meta: {error},
    error: true
  }
}

export const SHOW_PETS_ACTIONS = 'SHOW_PETS_ACTIONS';
export function showPetsActions(visibility) {
  return {
    type: SHOW_PETS_ACTIONS,
    payload: visibility,
    meta: {},
    error: false
  }
}


// -------------------- Immutable State Model の定義 --------------------
export const WalkingRecord = new Record({
  startDateTime: null, // 散歩開始イベント（開始ボタンをクリックした時にmomentを作成）
  endDateTime: null, // 散歩終了イベント（終了ボタンをクリックした時にmomentを作成）
  pets: [], // 散歩に連れて行ったペット
  markers: [], // 散歩中にマーキングしたマーカー
  distance: 0, // 散歩終了時に算出した移動距離

  // トースターを出すために必要なフラグ類
  completed: false, // 散歩情報の記録に成功したか否かのフラグ
  successAddMarker: false, // マーカーの追加に成功したか否かのフラグ
  failureGetCurrentLocation: false, // 現在地の取得に失敗したか否かのフラグ

  region: {},
  watchId: null,
  isStarted: false,
  visibility: new Animated.Value(0),
  peeAnim: new Animated.Value(0),
  pooAnim: new Animated.Value(0),
  markings: {
    distance: 0,
    events: [],
  },
});

// -------------------- Reducer の定義 --------------------
export function walkingReducer(state = new WalkingRecord(), action) {
  switch (action.type) {
    // 散歩に連れて行くペットをステートにセットする
    case REPLACE_PETS:
      return state.set('pets', action.payload);

    // 散歩を開始する（開始時の情報をステートにセットする）
    case START_WALKING:
      return state.set('startDateTime', action.payload);
    // 散歩を終了する（終了時の情報をステートにセットする）
    case END_WALKING:
      return state.set('endDateTime', action.payload.endDateTime).set('distance', action.payload.distance);
    // 散歩をキャンセルする
    case CANCEL_WALKING:
      return state.set('markers', []);

    // マーカーを追加する
    case SUCCESS_ADD_MARKER:
      var markers = [].concat(state.get('markers'));
      markers.push(action.payload);
      return state.set('markers', markers);

    // 現在地の取得に失敗した場合はフラグを立てる
    case FAILURE_GET_CURRENT_LOCATION:
      return state.set('failureGetCurrentLocation', true);

    // 散歩情報の記録に成功した場合に、ステートを変更する
    case SUCCESS_SAVE:
      return state.set('completed', true);

    case GET_CURRENT_LOCATION:
      return state;
    case SUCCESS_GET_CURRENT_LOCATION:
      return state.set('region', action.payload.region);
    case UPDATE_CURRENT_LOCATION:
      return state.set('region', action.payload);
    case INIT_WATCH_ID:
      return state;
    case SUCCESS_INIT_WATCH_ID:
      return state.set('watchId', action.payload);
    case CLEAR_LOCATION_WATCH:
      return state;
    case SUCCESS_CLEAR_LOCATION_WATCH:
      return state;
    case START_MARKING:
      return state.set('isStarted', true);
    case SUCCESS_START_MARKING:
      return state.set('markings', action.payload);
    case FINISH_MARKING:
      return state.set('isStarted', false);
    case SUCCESS_FINISH_MARKING:
      return state.set('markings', action.payload);
    case SHOW_PETS_ACTIONS:
      return state.set('visibility', action.payload);
    // case SUCCESS_SHOW_MY_PETS:
    //   const pets = action.payload.filter((pet) => !pet.dead || pet.dead !== '1');
    //   return state.set('pets', pets);

    default:
      return state;
  }
}