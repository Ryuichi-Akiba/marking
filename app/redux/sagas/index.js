import {fork} from 'redux-saga/effects'
import {
  handleRequestFacebookLogin,
  handleGetAccessToken,
  handleGetMe,
  handleLogout,
} from './login'
import {
  handleInitializeMenuContainer,
  handleRequestSuccessPostMePets,
} from './sidemenu'
import {
  handleRequestPostMyPet,
} from './addMyPetForm'
import {
  handleInitCurrentLocation,
  handleInitWatchId,
  handleClearLocationWatch,
} from './markingMap'

export default function* sagas() {
  // LOGIN
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
  yield fork(handleGetMe);
  yield fork(handleLogout);
  // MY PETS
  yield fork(handleInitializeMenuContainer);
  yield fork(handleRequestSuccessPostMePets);
  yield fork(handleRequestPostMyPet);
  // MAP
  yield fork(handleInitCurrentLocation);
  yield fork(handleInitWatchId);
  yield fork(handleClearLocationWatch);
}
