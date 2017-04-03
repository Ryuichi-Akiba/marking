import {GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import {REHYDRATE} from 'redux-persist/constants';
import {Record} from 'immutable';
import Session from '../../common/auth/Session'
import {USER} from '../../common/auth/sessionKey'

// -------------------- ActionCreator の定義 --------------------

// フェイスブックログイン成功時にキックするアクション
export const ON_LOGIN_WITH_FACEBOOK = 'ON_LOGIN_WITH_FACEBOOK';
export function loginWithFacebook(results) {
  return {
    type: ON_LOGIN_WITH_FACEBOOK,
    payload: {},
    meta: {results},
    error: false
  }
}

export const SUCCESS_LOGIN_WITH_FACEBOOK = 'SUCCESS_LOGIN_WITH_FACEBOOK';
export function successLoginWithFacebook(payload) {
  return {
    type: SUCCESS_LOGIN_WITH_FACEBOOK,
    payload: {facebookAccessToken:payload},
    meta: {payload},
    error: false
  }
}

export const FAILURE_LOGIN_WITH_FACEBOOK = 'FAILURE_LOGIN_WITH_FACEBOOK';
export function failureLoginWithFacebook(error) {
  return {
    type: FAILURE_LOGIN_WITH_FACEBOOK,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

export const SUCCESS_GET_ACCESS_TOKEN = 'SUCCESS_GET_ACCESS_TOKEN';
export function successGetAccessToken(payload) {
  return {
    type: SUCCESS_GET_ACCESS_TOKEN,
    payload: {isLoggedIn:true, token:payload},
    meta: {payload},
    error: false
  }
}

export const FAILURE_GET_ACCESS_TOKEN = 'FAILURE_GET_ACCESS_TOKEN';
export function failureGetAccessToken(error) {
  return {
    type: FAILURE_GET_ACCESS_TOKEN,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

export const SUCCESS_GET_ME = 'SUCCESS_GET_ME';
export function successGetMe(payload) {
  return {
    type: SUCCESS_GET_ME,
    payload: payload,
    meta: {payload},
    error: false
  }
}

export const FAILURE_GET_ME = 'FAILURE_GET_ME';
export function failureGetMe(error) {
  return {
    type: FAILURE_GET_ME,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

export const ON_LOGIN = 'ON_LOGIN';
export function onLogin(results) {
  return {
    type: ON_LOGIN,
    payload: {isLoggedIn: true},
    meta: {results},
    error: false
  }
}

/**
 * ログイン処理を途中でキャンセルする.
 * @param results
 */
export function cancelLogin(results) {
  console.log('cancel!!');
  console.log(results);
}

/**
 * ログインエラーをハンドリングする.
 * @param error
 */
export function handleLoginError(error) {
  console.error(error);
}

export const ON_LOGOUT = 'ON_LOGOUT';
export function onLogout() {
  console.log('onLogout');
  return {
    type: ON_LOGOUT,
    payload: {isLoggedIn: false},
    meta: {},
    error: false
  }
}

const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export function loginWithGoogle() {
  return {
    type: LOGIN_WITH_GOOGLE,
    payload: {},
    meta: {},
    error: false
  }
}

// -------------------- Immutable State Model の定義 --------------------
export const SessionRecord = new Record({
  isLoggedIn: false,
  facebookAccessToken: {},
  token: {},
  user: {}
});

// -------------------- Reducer の定義 --------------------
export function home(state = new SessionRecord(), action) {
  switch (action.type) {
    // フェイスブックログイン処理後のステート変更処理
    case ON_LOGIN_WITH_FACEBOOK:
      return new SessionRecord(action.payload);

    // フェイスブックログイン成功時のステート変更処理
    case SUCCESS_LOGIN_WITH_FACEBOOK:
      return new SessionRecord(action.payload);
    case FAILURE_LOGIN_WITH_FACEBOOK:
      console.log('FAILURE_LOGIN_WITH_FACEBOOK');

    // アクセストークン取得成功時のステート変更処理
    case SUCCESS_GET_ACCESS_TOKEN:
      console.log(action.payload);
      Session.setToken(action.payload.token);
      return new SessionRecord(action.payload);

    // アクセストークン取得失敗時のステート変更処理
    case FAILURE_GET_ACCESS_TOKEN:
      console.log('FAILURE_GET_ACCESS_TOKEN');

    case SUCCESS_GET_ME:
      Session.set(USER, action.payload);
      return state.set(USER, action.payload);

    case FAILURE_GET_ME:
      console.log('FAILURE_GET_ME');

    // ログアウト成功時のステート変更処理
    case ON_LOGOUT:
      return new SessionRecord();

    default:
      return state;
  }
}
