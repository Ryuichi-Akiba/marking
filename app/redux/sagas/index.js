import {fork} from 'redux-saga/effects'
import {
  handleInitializeRootScene
} from './root'
import {
  handleLoginWithFacebook,
  handleSuccessGetAccessToken,
  handleLogout,
} from './login'
import {
  handleInitializeMenuContainer,
  handleSuccessReloadMyPets,
} from './sidemenu'
import {
  handleInitializePetFormForColors,
  handleInitializePetFormForBreeds,
  handleInitializeSkipPetFormScene,
  handleAddMyPet,
  handleSuccessUploadMyPet,
  handleSuccessPostMyPet,
  handleArchivePet,
  handleSuccessArchivePet,
} from './addMyPetForm'
import {
  handleInitializePetDetailScene,
} from './detail'
import {
  handleGetPetsMarkingByMonth,
} from './graph'
import {
  handleAddMarker,
  handleSaveWalking,
} from './walking'
import * as archives from './archives'

export default function* sagas() {
  // ROOT SCENE
  yield fork(handleInitializeRootScene);
  // LOGIN
  yield fork(handleLoginWithFacebook);
  yield fork(handleSuccessGetAccessToken);
  yield fork(handleLogout);
  // SIDE MENU SCENE
  yield fork(handleInitializeMenuContainer);
  yield fork(handleSuccessReloadMyPets);
  // PET FORM SCENE
  yield fork(handleInitializePetFormForColors);
  yield fork(handleInitializePetFormForBreeds);
  yield fork(handleInitializeSkipPetFormScene);
  yield fork(handleAddMyPet);
  yield fork(handleSuccessUploadMyPet);
  yield fork(handleSuccessPostMyPet);
  yield fork(handleArchivePet);
  yield fork(handleSuccessArchivePet);
  // PET DETAIL SCENE
  yield fork(handleInitializePetDetailScene);
  yield fork(handleGetPetsMarkingByMonth);
  // WALKING SCENE
  yield fork(handleAddMarker);
  yield fork(handleSaveWalking);
  // for ArchivesScene
  yield fork(archives.handleInitializeArchivesScene);
}
