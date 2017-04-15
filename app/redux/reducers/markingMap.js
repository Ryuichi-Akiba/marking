import {Record} from "immutable";
import {Animated} from 'react-native';

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

export const FAILURE_GET_CURRENT_LOCATION = 'FAILURE_GET_CURRENT_LOCATION';
export function failureGetCurrentLocation(error) {
  return {
    type: FAILURE_GET_CURRENT_LOCATION,
    payload: {},
    meta: {error},
    error: true
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

export const HANDLE_SHOW_PEE = 'HANDLE_SHOW_PEE';
export function handleShowPee(payload) {
  return {
    type: HANDLE_SHOW_PEE,
    payload: payload,
    meta: {},
    error: false
  }
}

export const PEE = 'PEE';
export function pee(payload, petId) {
  return {
    type: PEE,
    payload: payload,
    meta: {petId},
    error: false
  }
}

export const SUCCESS_PEE = 'SUCCESS_PEE';
export function successPee(payload) {
  return {
    type: SUCCESS_PEE,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_PEE = 'FAILURE_PEE';
export function failurePee(error) {
  return {
    type: FAILURE_PEE,
    payload: {},
    meta: {error},
    error: true
  }
}
export const HANDLE_SHOW_POO = 'HANDLE_SHOW_POO';
export function handleShowPoo(payload) {
  return {
    type: HANDLE_SHOW_POO,
    payload: payload,
    meta: {},
    error: false
  }
}

export const POO = 'POO';
export function poo(payload, petId) {
  return {
    type: POO,
    payload: payload,
    meta: {petId},
    error: false
  }
}

export const SUCCESS_POO = 'SUCCESS_POO';
export function successPoo(payload) {
  return {
    type: SUCCESS_POO,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_POO = 'FAILURE_POO';
export function failurePoo(error) {
  return {
    type: FAILURE_POO,
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

export const SHOW_MY_PETS = 'SHOW_MY_PETS';
export function showMyPets() {
  return {
    type: SHOW_MY_PETS,
    payload: {},
    meta: {},
    error: false
  }
}

export const SUCCESS_SHOW_MY_PETS = 'SUCCESS_SHOW_MY_PETS';
export function successShowMyPets(payload) {
  return {
    type: SUCCESS_SHOW_MY_PETS,
    payload: payload,
    meta: {},
    error: false
  }
}

export const FAILURE_SHOW_MY_PETS = 'FAILURE_SHOW_MY_PETS';
export function failureShowMyPets(error) {
  return {
    type: FAILURE_SHOW_MY_PETS,
    payload: {},
    meta: {error},
    error: true
  }
}


// -------------------- Immutable State Model の定義 --------------------
export const MarkingMapRecord = new Record({
  region: {},
  watchId: null,
  isStarted: false,
  peeActive: false,
  pooActive: false,
  visibility: new Animated.Value(0),
  peeAnim: new Animated.Value(0),
  pooAnim: new Animated.Value(0),
  pets: [],
  markings: {
    distance: 0,
    events: [],
  },
});

// -------------------- Reducer の定義 --------------------
export function markingMap(state = new MarkingMapRecord(), action) {

  switch (action.type) {
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
      console.log("ここはreducerです。action.payload: " + JSON.stringify(action.payload));
      return state.set('markings', action.payload);
    case FINISH_MARKING:
      return state.set('isStarted', false);
    case SUCCESS_FINISH_MARKING:
      return state.set('markings', action.payload);
    case HANDLE_SHOW_PEE:
      return state.set('peeActive', !action.payload);
    case PEE:
      return state;
    case SUCCESS_PEE:
      return state.set('markings', action.payload);
    case HANDLE_SHOW_POO:
      return state.set('pooActive', !action.payload);
    case POO:
      return state;
    case SUCCESS_POO:
      return state.set('markings', action.payload);
    case SHOW_PETS_ACTIONS:
      return state.set('visibility', action.payload);
    case SHOW_MY_PETS:
      return state;
    case SUCCESS_SHOW_MY_PETS:
      return state.set('pets', action.payload);

    default:
      return state;
  }
}