import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {
  getAccessToken,
} from '../../api/api'
import {
  getFacebookAccessToken,
} from '../../api/facebook';
import {
  successLoginWithFacebook,
  failureLoginWithFacebook,
  successGetAccessToken,
  failureGetAccessToken,
  ON_LOGIN_WITH_FACEBOOK,
  SUCCESS_LOGIN_WITH_FACEBOOK,
} from '../reducers/home'

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


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//   try {
//     const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//   } catch (e) {
//     yield put({type: "USER_FETCH_FAILED", message: e.message});
//   }
// }

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
// export default function login() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }
