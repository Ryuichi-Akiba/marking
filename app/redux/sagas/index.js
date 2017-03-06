import {fork} from 'redux-saga/effects'
import {
  handleRequestFacebookLogin,
  handleGetAccessToken,
  handleGetMe,
} from './home'
import {
  handleRequestGetMePets,
  handleRequestSuccessPostMePets,
} from './myPets'
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
  // MY PETS
  yield fork(handleRequestGetMePets);
  yield fork(handleRequestSuccessPostMePets);
  yield fork(handleRequestPostMyPet);
  // MAP
  yield fork(handleInitCurrentLocation);
  yield fork(handleInitWatchId);
  yield fork(handleClearLocationWatch);
}
