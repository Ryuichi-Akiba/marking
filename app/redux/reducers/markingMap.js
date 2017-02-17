import {REHYDRATE} from "redux-persist/constants";
import {Record} from "immutable";

// 現在位置を取得するアクション
export const INIT_CURRENT_LOCATION = 'INIT_CURRENT_LOCATION';
export function initCurrentLocation() {
    return {
        type: INIT_CURRENT_LOCATION,
        payload: {},
        meta: {},
        error: false
    }
}

export const SUCCESS_INIT_CURRENT_LOCATION = 'SUCCESS_INIT_CURRENT_LOCATION'
export function successInitCurrentLocation(payload) {
    return {
        type: SUCCESS_INIT_CURRENT_LOCATION,
        payload: payload,
        meta: {},
        error: false
    }
}

export const FAILURE_INIT_CURRENT_LOCATION = 'FAILURE_INIT_CURRENT_LOCATION'
export function failureInitCurrentLocation(error) {
    return {
        type: FAILURE_INIT_CURRENT_LOCATION,
        payload: {},
        meta: {error},
        error: true
    }
}

// watchIDをクリアするアクション
export const CLEAR_WATCH_ID = 'CLEAR_WATCH_ID';
export function clearWatchID() {
    return {
        type: CLEAR_WATCH_ID,
        payload: null,
        meta: {},
        error: false
    }
}

export const SUCCESS_CLEAR_WATCH_ID = 'SUCCESS_CLEAR_WATCH_ID'
export function successClearWatchID(payload) {
    return {
        type: SUCCESS_CLEAR_WATCH_ID,
        payload: payload,
        meta: {},
        error: false
    }
}

export const FAILURE_CLEAR_WATCH_ID = 'FAILURE_CLEAR_WATCH_ID'
export function failureClearWatchID(error) {
    return {
        type: FAILURE_CLEAR_WATCH_ID,
        payload: null,
        meta: {error},
        error: true
    }
}

// -------------------- Immutable State Model の定義 --------------------
export const MarkingMapRecord = new Record({
    region: {},
    watchID: null
});

// -------------------- Reducer の定義 --------------------
export function markingMap(state = new MarkingMapRecord(), action) {

    switch (action.type) {
        case REHYDRATE:
            if (action.key === 'markingMap') {
                return new MarkingMapRecord(action.payload);
            }
            return state;

        case INIT_CURRENT_LOCATION:
            return state;
        case SUCCESS_INIT_CURRENT_LOCATION:
            // FIXME state.set だと異なる型と認識されるようで動かない。Redux-persistの影響？
            //return state.set('region', action.payload.region);
            return new MarkingMapRecord({region: action.payload.region});
        case CLEAR_WATCH_ID:
            return state;
        case SUCCESS_CLEAR_WATCH_ID:
            return state.set('watchID', action.payload);

        default:
            return state;
    }
}