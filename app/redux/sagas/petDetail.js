import {call, put, fork, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {getAccessToken} from '../../common/api/api'
import {getMe} from '../../common/api/me'
import {getFacebookAccessToken} from '../../common/api/facebook';

// export function* handleGetMe() {
//   while (true) {
//     const action = yield take(SUCCESS_GET_ACCESS_TOKEN);
//     const {payload, error} = yield call(getMe);
//     if (payload && !error) {
//       yield put(successGetMe(payload));
//     } else {
//       yield put(failureGetMe(error));
//     }
//   }
// }
