import {createAction} from 'redux-actions'
import {Record, Map, Set} from 'immutable'
import moment from 'moment'

// -------------------- ActionCreator の定義 --------------------

// ペット詳細ページを初期化するアクション
export const INITIALIZE_PET_DETAIL_SCENE = 'INITIALIZE_PET_DETAIL_SCENE';
export const initialize = createAction(INITIALIZE_PET_DETAIL_SCENE, (params) => params);

// マーキング情報の取得に成功した時のアクション
export const SUCCESS_GET_MARKINGS = 'SUCCESS_GET_MARKINGS';
export const successGetMarkings = createAction(SUCCESS_GET_MARKINGS);

// マーキング情報を取得するアクション（既に読み込み済みの場合は読み込まない）
export function findNewMarkings(params, dates) {
  if (params.refresh || !dates)
    return initialize(params);

  const target = moment(params.date).startOf('month');
  const exists = dates.filter((date) => target.isSame(date));
  if (exists && exists.size !== 0)
    return innerFindNewMarkings();

  return initialize(params);
}

// 既に該当するマーキング情報がある場合のアクション
export const FIND_NEW_MARKINGS = 'FIND_NEW_MARKINGS';
export const innerFindNewMarkings = createAction(FIND_NEW_MARKINGS);

// -------------------- Immutable State Model の定義 --------------------
export const PetDetailRecord = new Record({
  // 日付をキーに取得できるようにマップ形式にする
  dates: Set(),
  markings: Map(),
  markers: [],
});

// マーキングマップに取得したデータを積み上げる
function mergeMarkersMap(map, array) {
  array.forEach(element => {
    const date = moment(element.startDateTime).startOf('date');
    var markings = map.get(element);
    if (!markings || markings.length === 0) {
      markings = [];
    }
    markings.push(element);
    map = map.set(date, markings);
  });
  return map;
}

// -------------------- Reducer の定義 --------------------
export function petDetailReducer(state = new PetDetailRecord(), action) {
  switch (action.type) {
    // 初期ロード時・年月変更時の年月を積み上げる
    case INITIALIZE_PET_DETAIL_SCENE:
      var date = moment(action.payload.date).startOf('month');
      return state.set('dates', state.dates.add(date));

    case SUCCESS_GET_MARKINGS:
      // return state.set('markings', mergeMarkersMap(state.markings, action.payload));
      if (state.dates.size === 1) {
        return state.set('markings', mergeMarkersMap(state.markings, testdata));
      } else {
        return state.set('markings', mergeMarkersMap(state.markings, testdata2));
      }

    default:
      return state;
  }
}

// FIXME テストデータなので後で消すこと
const testdata = [{
  distance: 1230,
  startDateTime: "2017-04-01T12:10:00.000+09:00",
  events: [
    {
      "petId": "19388edd-791b-420e-b617-ceaa01658c20",
      "eventType": "PEE",
      "eventDateTime": "2017-04-01T12:15:00.000+09:00",
      "geometry": {
        "type": "Point",
        "coordinates": [139.766247, 35.681298]
      }
    },
    {
      "petId": "19388edd-791b-420e-b617-ceaa01658c20",
      "eventType": "POO",
      "eventDateTime": "2017-04-01T12:20:00.000+09:00",
      "geometry": {
        "type": "Point",
        "coordinates": [139.766247, 35.682298]
      }
    }
  ]
}];
const testdata2 = [{
  distance: 1230,
  startDateTime: "2017-03-31T12:10:00.000+09:00",
  events: [
    {
      "petId": "19388edd-791b-420e-b617-ceaa01658c20",
      "eventType": "PEE",
      "eventDateTime": "2017-04-01T12:15:00.000+09:00",
      "geometry": {
        "type": "Point",
        "coordinates": [139.766247, 35.681298]
      }
    },
    {
      "petId": "19388edd-791b-420e-b617-ceaa01658c20",
      "eventType": "POO",
      "eventDateTime": "2017-04-01T12:20:00.000+09:00",
      "geometry": {
        "type": "Point",
        "coordinates": [139.766247, 35.682298]
      }
    }
  ]
}];
