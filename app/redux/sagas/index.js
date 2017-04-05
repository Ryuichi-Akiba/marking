import {fork} from 'redux-saga/effects'
import {
  handleInitializeRootScene
} from './root'
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
  handleInitializePetFormScene,
  handleRequestPostMyPet,
} from './addMyPetForm'
import {
  handleInitCurrentLocation,
  handleInitWatchId,
  handleClearLocationWatch,
} from './markingMap'

export default function* sagas() {
  // ROOT SCENE
  yield fork(handleInitializeRootScene);
  // LOGIN
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
  yield fork(handleGetMe);
  yield fork(handleLogout);
  // MY PETS
  yield fork(handleInitializeMenuContainer);
  yield fork(handleRequestSuccessPostMePets);
  yield fork(handleRequestPostMyPet);
  yield fork(handleInitializePetFormScene);
  // MAP
  yield fork(handleInitCurrentLocation);
  yield fork(handleInitWatchId);
  yield fork(handleClearLocationWatch);
}
