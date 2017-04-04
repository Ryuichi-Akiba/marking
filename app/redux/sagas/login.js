import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {getAccessToken} from '../../common/api/api'
import {getMe} from '../../common/api/me'
import {getFacebookAccessToken} from '../../common/api/facebook';
import {
  successLoginWithFacebook,
  failureLoginWithFacebook,
  successGetAccessToken,
  failureGetAccessToken,
  successGetMe,
  failureGetMe,
  successDestroySession,
  ON_LOGIN_WITH_FACEBOOK,
  SUCCESS_LOGIN_WITH_FACEBOOK,
  SUCCESS_GET_ACCESS_TOKEN,
  LOGOUT,
} from '../reducers/login'
import Session from '../../common/auth/Session'

export function* handleRequestFacebookLogin() {
  while (true) {
    const action = yield take(ON_LOGIN_WITH_FACEBOOK);
    const {payload, error} = yield call(getFacebookAccessToken);
    if (payload && !error) {
      yield put(successLoginWithFacebook(payload));
    } else {
      yield put(failureLoginWithFacebook(error));
    }
  }
}

export function* handleGetAccessToken() {
  while (true) {
    const action = yield take(SUCCESS_LOGIN_WITH_FACEBOOK);
    const {payload, error} = yield call(getAccessToken, action.payload.facebookAccessToken);
    if (payload && !error) {
      yield put(successGetAccessToken(payload));
    } else {
      yield put(failureGetAccessToken(error));
    }
  }
}

export function* handleGetMe() {
  while (true) {
    const action = yield take(SUCCESS_GET_ACCESS_TOKEN);
    const {payload, error} = yield call(getMe);
    if (payload && !error) {
      yield put(successGetMe(payload));
    } else {
      yield put(failureGetMe(error));
    }
  }
}

/**
 * ログアウト処理後に非同期で行う必要のあるログアウト処理を実行する.
 */
export function* handleLogout() {
  while (true) {
    yield take(LOGOUT);
    yield call(Session.destroy);
    yield put(successDestroySession());
  }
}
