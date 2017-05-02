import {AccessToken} from 'react-native-fbsdk';
import axios from 'axios'
import buffer from 'buffer'
import Session from './Session'
import * as constants from '../constants'

// フェイスブックの機構を用いてログイン処理を行う
export function loginWithFacebook() {
  return AccessToken.getCurrentAccessToken()
    // フェイスブックのトークンを用いてアクセストークンを取得する
    .then(response => getAccessTokenUsingFacebookToken(response))
    // 共通のPayloadの形式にレスポンスを変更して返す
    .then(response => Promise.resolve({payload:response}));
}

// フェイスブックのトークンを用いてアクセストークンを取得する
function getAccessTokenUsingFacebookToken(facebook) {
  var auth = new buffer.Buffer(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET);
  console.log(`call oauth api [POST] ${constants.SERVER}/oauth/token`);

  return axios.post(`${constants.SERVER}/oauth/token`, {}, {
    headers: {'Authorization': 'Basic ' + auth.toString('base64'), 'Content-Type': 'application/json'},
    params: {'grant_type': 'facebook', 'fb_token': facebook.accessToken}
  })
    // アクセストークンを取得した際は常にセッションのトークンを最新版で上書きする
    .then(response => Session.setToken(response.data))
    .catch(error => Promise.resolve({error:error.response}));
}
