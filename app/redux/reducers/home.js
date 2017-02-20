import {GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import {REHYDRATE} from 'redux-persist/constants';
import {Record} from 'immutable';
import Session from '../../common/auth/Session'

// -------------------- ActionCreator の定義 --------------------

// フェイスブックログイン成功時にキックするアクション
export const ON_LOGIN_WITH_FACEBOOK = 'ON_LOGIN_WITH_FACEBOOK';
export function onLoginWithFacebook(results) {
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
    payload: {isLogin:false},
    meta: {error},
    error: true
  }
}

export const SUCCESS_GET_ACCESS_TOKEN = 'SUCCESS_GET_ACCESS_TOKEN';
export function successGetAccessToken(payload) {
  return {
    type: SUCCESS_GET_ACCESS_TOKEN,
    payload: {isLogin:true, token:payload},
    meta: {payload},
    error: false
  }
}

export const FAILURE_GET_ACCESS_TOKEN = 'FAILURE_GET_ACCESS_TOKEN';
export function failureGetAccessToken(error) {
  return {
    type: FAILURE_GET_ACCESS_TOKEN,
    payload: {isLogin:false},
    meta: {error},
    error: true
  }
}

export const SUCCESS_GET_ME = 'SUCCESS_GET_ME';
export function successGetMe(payload) {
  return {
    type: SUCCESS_GET_ME,
    payload: {user:payload},
    meta: {payload},
    error: false
  }
}

export const FAILURE_GET_ME = 'FAILURE_GET_ME';
export function failureGetMe(error) {
  return {
    type: FAILURE_GET_ME,
    payload: {isLogin:false},
    meta: {error},
    error: true
  }
}


export const ON_LOGIN = 'ON_LOGIN';
export function onLogin(results) {
  return {
    type: ON_LOGIN,
    payload: {isLogin: true},
    meta: {
      results
    },
    error: false
  }
}
export function onCancel(results) {
  console.log('cancel!!');
  console.log(results);
}
export function onError(error) {
  console.log(error);
}

export const ON_LOGOUT = 'ON_LOGOUT';
export function onLogout() {
  console.log('onLogout');
  return {
    type: ON_LOGOUT,
    payload: {isLogin: false},
    meta: {},
    error: false
  }
}

export function loginWithFacebook() {
  var getUserFromFB = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,first_name,last_name,email,gender,picture.width(350).height(350)',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log('Success fetching data: ' + JSON.stringify(result));
        }
      },
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  // this.setState({loading: false});
  if (error) {
    alert('Error logging in.');
  } else {
    if (result.isCanceled) {
      alert('Login cancelled.');
    } else {
      console.log(JSON.stringify(result));
      getUserFromFB();
    }
  }

  return {
    type: LOGIN_WITH_FACEBOOK,
    payload: {},
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
  isLogin: false,
  facebookAccessToken: {},
  token: {},
  user: {}
});

// -------------------- Reducer の定義 --------------------
export function home(state = new SessionRecord(), action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.key === 'home') {
        return new SessionRecord(action.payload);
      }
      return state;

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
      Session.setToken(action.payload.token);
      return new SessionRecord(action.payload);
    // アクセストークン取得失敗時のステート変更処理
    case FAILURE_GET_ACCESS_TOKEN:
      console.log('FAILURE_GET_ACCESS_TOKEN');

    case SUCCESS_GET_ME:
      Session.set(action.payload);
      return state.set('user', action.payload);
    case FAILURE_GET_ME:
      console.log('FAILURE_GET_ME');

    // ログアウト成功時のステート変更処理
    case ON_LOGOUT:
      return new SessionRecord();

    default:
      return state;
  }
}
