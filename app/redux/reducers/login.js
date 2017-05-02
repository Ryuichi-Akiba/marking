import {Record} from 'immutable'
import {createAction} from 'redux-actions'
import {AccessToken, LoginManager} from 'react-native-fbsdk'
import Session from '../../common/auth/Session'
import {USER} from '../../common/auth/sessionKey'

// -------------------- ActionCreator の定義 --------------------

// フェイスブックログイン成功時にキックするアクション
export const LOGIN_WITH_FACEBOOK = 'App/Login/LOGIN_WITH_FACEBOOK';
export const loginWithFacebook = createAction(LOGIN_WITH_FACEBOOK);

// フェイスブックログイン失敗時のアクション
export const FAILURE_LOGIN_WITH_FACEBOOK = 'FAILURE_LOGIN_WITH_FACEBOOK';
export function failureLoginWithFacebook(error) {
  return {
    type: FAILURE_LOGIN_WITH_FACEBOOK,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

// ペティカルのトークン取得成功時のアクション
export const SUCCESS_GET_ACCESS_TOKEN = 'SUCCESS_GET_ACCESS_TOKEN';
export function successGetAccessToken(payload) {
  return {
    type: SUCCESS_GET_ACCESS_TOKEN,
    payload: {isLoggedIn:true, token:payload},
    meta: {payload},
    error: false
  }
}
// ペティカルのトークン取得失敗時のアクション
export const FAILURE_GET_ACCESS_TOKEN = 'FAILURE_GET_ACCESS_TOKEN';
export function failureGetAccessToken(error) {
  return {
    type: FAILURE_GET_ACCESS_TOKEN,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

// ログインユーザー情報取得成功時のアクション
export const SUCCESS_GET_ME = 'SUCCESS_GET_ME';
export function successGetMe(payload) {
  return {
    type: SUCCESS_GET_ME,
    payload: payload,
    meta: {payload},
    error: false
  }
}
// ログインユーザー情報取得失敗時のアクション
export const FAILURE_GET_ME = 'FAILURE_GET_ME';
export function failureGetMe(error) {
  return {
    type: FAILURE_GET_ME,
    payload: {isLoggedIn:false},
    meta: {error},
    error: true
  }
}

// ログイン成功時のアクション（経路はどこからであってもログイン処理最後に呼び出す共通のアクション）
export const ON_LOGIN = 'ON_LOGIN';
export function onLogin(results) {
  return {
    type: ON_LOGIN,
    payload: {isLoggedIn: true},
    meta: {results},
    error: false
  }
}
// ログイン処理を途中でキャンセルするアクション
export function cancelLogin(results) {
  console.log('cancel!!');
  console.log(results);
}
// ログインエラーをハンドリングするアクション
export function handleLoginError(error) {
  console.error(error);
}

// ログアウトを行うアクション
export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
    payload: {isLoggedIn: true},
    meta: {},
    error: false
  }
}
// 内部で持つセッションストレージのクリアに成功したときのアクション
export const SUCCESS_DESTROY_SESSION = 'SUCCESS_DESTROY_SESSION';
export function successDestroySession() {
  // セッションがクリアできているので、フェイスブックのトークン等も削除する
  if (AccessToken.getCurrentAccessToken() != null) {
    LoginManager.logOut();
  }
  return {
    type: SUCCESS_DESTROY_SESSION,
    payload: {},
    meta: {},
    error: false
  }
}

// -------------------- Immutable State Model の定義 --------------------
export const LoginRecord = new Record({
  isLoggedIn: false,
  facebookAccessToken: {},
  token: {},
  user: {}
});

// -------------------- Reducer の定義 --------------------
export function loginReducer(state = new LoginRecord(), action) {
  switch (action.type) {

    case FAILURE_LOGIN_WITH_FACEBOOK:
      console.log('FAILURE_LOGIN_WITH_FACEBOOK');

    // アクセストークン取得成功時のステート変更処理
    case SUCCESS_GET_ACCESS_TOKEN:
      console.log(action.payload);
      // Session.setToken(action.payload.token);
      return new LoginRecord(action.payload);

    // アクセストークン取得失敗時のステート変更処理
    case FAILURE_GET_ACCESS_TOKEN:
      console.log('FAILURE_GET_ACCESS_TOKEN');

    // ログイン後にユーザー情報の取得に成功した際のステート変更処理
    case SUCCESS_GET_ME:
      Session.set(USER, action.payload);
      return state.set(USER, action.payload);

    // ログアウト成功時のステート変更処理
    case SUCCESS_DESTROY_SESSION:
      return new LoginRecord();

    default:
      return state;
  }
}
