import {fork} from 'redux-saga/effects'
import {
  handleRequestFacebookLogin,
  handleGetAccessToken,
} from './home'

export default function* sagas() {
  yield fork(handleRequestFacebookLogin);
  yield fork(handleGetAccessToken);
}
