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

// -------------------- Immutable State Model の定義 --------------------
export const MarkingMapRecord = new Record({
    region: {},
    watchId: ''
});

// -------------------- Reducer の定義 --------------------
export function markingMap(state = new MarkingMapRecord(), action) {

    switch (action.type) {
        case REHYDRATE:
            if (action.key == 'markingMap') {
                return new MarkingMapRecord(action.payload);
            }
            return state;

        case INIT_CURRENT_LOCATION:
            return state;
        case SUCCESS_INIT_CURRENT_LOCATION:
            console.log(state);
            return state.set('region', action.payload);

        default:
            return state;
    }
}