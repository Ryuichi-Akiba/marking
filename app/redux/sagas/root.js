import {call, put, take} from 'redux-saga/effects'
import {AccessToken} from 'react-native-fbsdk'
import {
  INITIALIZE_ROOT_SCENE,
  alreadyLoggedInFacebook,
  successInitializeRootScene,
} from '../../redux/reducers/root'

export function* handleInitializeRootScene() {
  while (true) {
    yield take(INITIALIZE_ROOT_SCENE);
    const payload = yield call(AccessToken.getCurrentAccessToken);
    if (!!payload) {
      yield put(alreadyLoggedInFacebook(payload));
    } else {
      yield put(successInitializeRootScene())
    }
  }
}
