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
  handleInitializeSkipPetFormScene,
  handleAddMyPet,
  handleSuccessUploadMyPet,
  handleSuccessPostMyPet,
} from './addMyPetForm'
import {
  handleInitCurrentLocation,
  handleInitWatchId,
  handleClearLocationWatch,
  handleShowMyPets,
  handleStartMarking,
  handleFinishMarking,
  handlePee,
  handlePoo,
} from './markingMap'

export default function* sagas() {
  // ROOT SCENE
  yield fork(handleInitializeRootScene);
  // LOGIN
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
  yield fork(handleGetMe);
  yield fork(handleLogout);
  // SIDE MENU SCENE
  yield fork(handleInitializeMenuContainer);
  yield fork(handleRequestSuccessPostMePets);
  // MY PETS SCENE
  yield fork(handleInitializeSkipPetFormScene);
  yield fork(handleAddMyPet);
  yield fork(handleSuccessUploadMyPet);
  yield fork(handleSuccessPostMyPet);
  // MAP
  yield fork(handleInitCurrentLocation);
  yield fork(handleInitWatchId);
  yield fork(handleClearLocationWatch);
  yield fork(handleShowMyPets);
  yield fork(handleStartMarking);
  yield fork(handleFinishMarking);
  yield fork(handlePee);
  yield fork(handlePoo);
}
