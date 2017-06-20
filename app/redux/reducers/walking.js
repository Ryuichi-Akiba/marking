import {Record} from 'immutable'
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

// メッセージの表示非表示フラグ等、ステートをクリアする
export const CLEAR = 'App/Walking/CLEAR';
export const clear = createAction(CLEAR);


// -------------------- Immutable State Model の定義 --------------------
export const WalkingRecord = new Record({
  startDateTime: null, // 散歩開始イベント（開始ボタンをクリックした時にmomentを作成）
  endDateTime: null, // 散歩終了イベント（終了ボタンをクリックした時にmomentを作成）
  pets: [], // 散歩に連れて行ったペット
  markers: [], // 散歩中にマーキングしたマーカー
  distance: 0, // 散歩終了時に算出した移動距離

  completed: false, // 散歩情報の記録に成功したか否かのフラグ
  successAddMarker: false, // マーカーの追加に成功したか否かのフラグ
  failureGetCurrentLocation: false, // 現在地の取得に失敗したか否かのフラグ
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
      return state.set('markers', markers).set('successAddMarker', true);

    // 散歩情報の記録に成功した場合に、ステートを変更する
    case SUCCESS_SAVE:
      return state.set('completed', true);

    // 現在地の取得に失敗した場合はフラグを立てる
    case FAILURE_GET_CURRENT_LOCATION:
      return state.set('failureGetCurrentLocation', true);

    // メッセージをクリアする
    case CLEAR:
      return state.set('successAddMarker', false).set('failureGetCurrentLocation', false).set('completed', false);

    default:
      return state;
  }
}