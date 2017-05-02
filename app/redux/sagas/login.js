import {call, put, take} from 'redux-saga/effects'
import {getMe} from '../../common/api/me'
import * as auth from '../../common/auth/auth'
import {
  failureLoginWithFacebook,
  successGetAccessToken,
  successGetMe,
  failureGetMe,
  successDestroySession,
  LOGIN_WITH_FACEBOOK,
  SUCCESS_GET_ACCESS_TOKEN,
  LOGOUT,
} from '../reducers/login'
import Session from '../../common/auth/Session'

// フェイスブックのログイン機構を用いてログインに成功したら（LoginReducer#LOGIN_WITH_FACEBOOK）、ペティカルのアクセストークンを発行する
export function* handleLoginWithFacebook() {
  while (true) {
    yield take(LOGIN_WITH_FACEBOOK);
    const {payload, error} = yield call(auth.loginWithFacebook);
    if (payload && !error) {
      yield put(successGetAccessToken(payload));
    } else {
      yield put(failureLoginWithFacebook(error));
    }
  }
}

// アクセストークンの取得に成功したら（LoginReducer#SUCCESS_GET_ACCESS_TOKEN）、ログインしているユーザーの基本情報を取得する
export function* handleSuccessGetAccessToken() {
  while (true) {
    yield take(SUCCESS_GET_ACCESS_TOKEN);
    const {payload, error} = yield call(getMe);
    if (payload && !error) {
      yield put(successGetMe(payload));
    } else {
      yield put(failureGetMe(error));
    }
  }
}

// ログアウトのアクションが実行されたら（LoginReducer#LOGOUT）、セッション等の情報を全て破棄してログアウトする
export function* handleLogout() {
  while (true) {
    yield take(LOGOUT);
    yield call(Session.destroy);
    yield put(successDestroySession());
  }
}
