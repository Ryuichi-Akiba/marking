import {createAction} from 'redux-actions'
import {Record} from 'immutable'

// -------------------- ActionCreator の定義 --------------------

export function initialize(enableSkip : boolean) {
}

// ペット登録ページのコンテナを初期化するアクション（スキップできない）
export const INITIALIZE_PET_FORM_SCENE = 'INITIALIZE_PET_FORM_SCENE';
export const initializePetForm = createAction(INITIALIZE_PET_FORM_SCENE);

// -------------------- Immutable State Model の定義 --------------------
export const PetDetailRecord = new Record({
  skip: false,
  created: false,
});

// -------------------- Reducer の定義 --------------------
export function petDetailReducer(state = new PetDetailRecord(), action) {
  switch (action.type) {
    default:
      return state;
  }
}
