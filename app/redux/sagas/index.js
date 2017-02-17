import {fork} from 'redux-saga/effects'
import {
  handleRequestFacebookLogin,
  handleGetAccessToken,
  handleGetMe,
} from './home'
import {
  handleInitCurrentLocation,
  handleClearWatchID,
} from './markingMap'

export default function* sagas() {
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
  yield fork(handleGetMe);
  yield fork(handleInitCurrentLocation);
  yield fork(handleClearWatchID);
}
