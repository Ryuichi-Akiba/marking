import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------

// ペットフォームシーンを初期化するアクション
export const INITIALIZE_PET_FORM = 'App/PetFormScene/INITIALIZE_PET_FORM_SCENE';
export const initialize = createAction(INITIALIZE_PET_FORM, (payload) => payload);

// 入力フォームに表示する毛色一覧の取得に成功した時に呼び出されるアクション
export const SUCCESS_GET_COLORS = 'App/PetFormScene/SUCCESS_GET_COLORS';
export const successGetColors = createAction(SUCCESS_GET_COLORS, (payload) => payload);

// 入力フォームに表示する品種一覧の取得に成功した時に呼び出されるアクション
export const SUCCESS_GET_BREEDS = 'App/PetFormScene/SUCCESS_GET_BREEDS';
export const successGetBreeds = createAction(SUCCESS_GET_BREEDS, (payload) => payload);

// ペット登録ページのコンテナを初期化するアクション（スキップできない）
export const INITIALIZE_PET_FORM_SCENE = 'INITIALIZE_PET_FORM_SCENE';
export const initializePetForm = createAction(INITIALIZE_PET_FORM_SCENE, (payload) => payload);

// ペット登録ページのコンテナを初期化するアクション（自動的にスキップされるケースあり）
export const INITIALIZE_SKIP_PET_FORM_SCENE = 'INITIALIZE_SKIP_PET_FORM_SCENE';
export const initializeSkipPetForm = createAction(INITIALIZE_SKIP_PET_FORM_SCENE);

// ペット取得に成功した時のアクション
export const SUCCESS_GET_MY_PETS = 'SUCCESS_GET_MY_PETS';
export const successGetMyPets = createAction(SUCCESS_GET_MY_PETS, (payload) => payload);

export const ADD_MY_PET = 'ADD_MY_PET';
export function addMyPet(values) {
  return {
    type: ADD_MY_PET,
    payload: values,
    meta: {},
    error: false
  }
}

// ペットを追加処理するためにイメージのアプロードに成功した時のアクション
export const SUCCESS_UPLOAD_MY_PETS = 'SUCCESS_UPLOAD_MY_PETS';
export const successUploadMyPets = createAction(SUCCESS_UPLOAD_MY_PETS, (payload) => payload);

// ペットの登録に成功した時のアクション
export const SUCCESS_POST_MY_PETS = 'SUCCESS_POST_MY_PETS';
export const successPostMyPets = createAction(SUCCESS_POST_MY_PETS, (payload) => payload);

// キャッシュをクリアするために、データの変更が合った時にペットの情報のリロードに成功した時のアクション
export const SUCCESS_RELOAD_MY_PETS = 'SUCCESS_RELOAD_MY_PETS';
export const successReloadMyPets = createAction(SUCCESS_RELOAD_MY_PETS, (payload) => payload);

// ペットフォームのステートを元の状態に戻すアクション
export const CLEAR = 'App/PetForm/CLEAR';
export const clear = createAction(CLEAR, (payload) => payload);


// -------------------- Immutable State Model の定義 --------------------
export const AddMyPetFormRecord = new Record({
  // フォームに表示する毛色一覧
  colors: [],
  // フォームに表示する品種一覧
  breeds: [],

  // 登録処理が成功した場合のフラグ
  created: false,
});


// -------------------- Reducer の定義 --------------------
export function petForm(state = new AddMyPetFormRecord(), action) {
  switch (action.type) {
    // フォームを初期化した時に毛色一覧をセットする
    case SUCCESS_GET_COLORS:
      return state.set('colors', action.payload);
    // フォームを初期化した時に品種一覧をセットする
    case SUCCESS_GET_BREEDS:
      return state.set('breeds', action.payload);

    // ペットの登録が出来た時はCREATEDをTRUEにする（最新のペット情報の再取得が完了してから処理を完了にする）
    case SUCCESS_RELOAD_MY_PETS:
      return state.set('created', true);

    // ステートに保持した状態をリセットする
    case CLEAR:
      return state.set('created', false);

    default:
      return state;
  }
}
