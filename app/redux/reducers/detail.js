import {createAction} from 'redux-actions'
import {Record, Map, Set} from 'immutable'
import moment from 'moment'

// -------------------- ActionCreator の定義 --------------------

// ペット詳細ページを初期化するアクション
export const INITIALIZE_PET_DETAIL_SCENE = 'App/PetDetail/INITIALIZE_PET_DETAIL_SCENE';
export const initialize = createAction(INITIALIZE_PET_DETAIL_SCENE, (params) => params);

// 散歩情報の取得に成功した時のアクション
export const SUCCESS_GET_WALKINGS = 'App/PetDetail/SUCCESS_GET_WALKINGS';
export const successGetWalkings = createAction(SUCCESS_GET_WALKINGS);

// マーキング情報を取得するアクション（既に読み込み済みの場合は読み込まない）
//@deprecated
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

// ========== 散歩情報の取得に使用する一連のアクション
// 指定月の散歩情報を取得するアクション
export const GET_MONTHLY_WALKINGS = 'App/PetDetail/GET_MONTHLY_WALKINGS';
export const getMonthlyWalkings = createAction(GET_MONTHLY_WALKINGS);
// 指定月の散歩情報の取得に成功した場合のアクション
export const SUCCESS_GET_MONTHLY_WALKINGS = 'App/PetDetail/SUCCESS_GET_MONTHLY_WALKINGS';
export const successGetMonthlyWalkings = createAction(SUCCESS_GET_MONTHLY_WALKINGS);

// マーキングエリア描画のための散歩情報を取得するアクション
export const GET_MARKING_WALKINGS = 'App/PetDetail/GET_MARKING_WALKINGS';
export const getMarkingWalkings = createAction(GET_MARKING_WALKINGS);
// マーキングエリア描画のための散歩情報の取得に成功した場合のアクション
export const SUCCESS_GET_MARKING_WALKINGS = 'App/PetDetail/SUCCESS_GET_MARKING_WALKINGS';
export const successGetMarkingWalkings = createAction(SUCCESS_GET_MARKING_WALKINGS);

// ========== アーカイブに使用する一連のアクション
// ペットをアーカイブするアクション
export const ARCHIVE_PET = 'App/PetDetail/ARCHIVE_PET';
export const archivePet = createAction(ARCHIVE_PET, (payload) => payload);
// ペットのアーカイブに成功した場合のアクション
export const SUCCESS_ARCHIVE_PET = 'App/PetDetail/SUCCESS_ARCHIVE_PET';
export const successArchivePet = createAction(SUCCESS_ARCHIVE_PET);
// キャッシュをクリアするために、データの変更があった時にペットの情報のリロードに成功した時のアクション
export const SUCCESS_RELOAD_MY_PETS = 'App/PetDetail/SUCCESS_RELOAD_MY_PETS';
export const successReloadMyPets = createAction(SUCCESS_RELOAD_MY_PETS, (payload) => payload);

// ========== 横断的に使用する一連のアクション
// ペット詳細のステートを元の状態に戻すアクション
export const CLEAR = 'App/PetDetail/CLEAR';
export const clear = createAction(CLEAR, (payload) => payload);


// -------------------- Immutable State Model の定義 --------------------
export const DetailRecord = new Record({
  // 日付をキーに取得できるようにマップ形式にする
  date: new Date(), // 初期値設定しておく

  // 散歩情報
  walkings: [],
  monthly:  [], // 月間の散歩情報を保持する
  markings: [], // マーキングエリアを描画するための散歩情報を保持する

  // 散歩情報の取得に成功した場合のフラグ
  successGetWalkings: false,
  successGetMonthlyWalkings: false,
  successGetMarkingWalkings: false,

  // ペットのアーカイブ処理に成功したかを示すフラグ
  archived: false,
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
export function detailReducer(state = new DetailRecord(), action) {
  switch (action.type) {
    // ロードした日付をステートにセットする
    case INITIALIZE_PET_DETAIL_SCENE:
      return state.set('date', action.payload.date);

    // 指定日の散歩情報をステートに保存する
    case SUCCESS_GET_WALKINGS:
      return state.set('walkings', action.payload).set('successGetWalkings', true);
    // 指定月の散歩情報をステートに保存する
    case SUCCESS_GET_MONTHLY_WALKINGS:
      return state.set('monthly', action.payload).set('successGetMonthlyWalkings', true);
    // マーキング情報描画のための散歩情報をステートに保存する
    case SUCCESS_GET_MARKING_WALKINGS:
      return state.set('markings', action.payload).set('successGetMarkingWalkings', true);

    // ペットのアーカイブに成功した場合にフラグを変更する（最新リロードまでが完了してからフラグを更新する）
    case SUCCESS_RELOAD_MY_PETS:
      return state.set('archived', true);

    // ステートをクリアして元の状態に戻す
    case CLEAR:
      return state
        .set('archived', false)
        .set('successGetWalkings', false)
        .set('successGetMonthlyWalkings', false)
        .set('successGetMarkingWalkings', false);

    default:
      return state;
  }
}
