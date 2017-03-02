import {fork} from 'redux-saga/effects'
import {
  handleRequestFacebookLogin,
  handleGetAccessToken,
  handleGetMe,
} from './home'
import {
  handleRequestGetMePets,
} from './myPets'
import {
  handleInitCurrentLocation,
  handleInitWatchId,
  handleClearLocationWatch,
} from './markingMap'

export default function* sagas() {
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
  yield fork(handleGetMe);
  yield fork(handleRequestGetMePets);
  yield fork(handleInitCurrentLocation);
  yield fork(handleInitWatchId);
  yield fork(handleClearLocationWatch);
}
