import axios from 'axios'
import buffer from 'buffer'
import Session from '../commons/Session'

// TODO 環境依存設定なので、どこかに移動したい（動作環境に応じて設定を切り替えられるように）
// export const SERVER = 'http://localhost:8080';
// const CLIENT_ID = 'majimenatestapp';
// const CLIENT_SECRET = 'mySecretOAuthSecret';

export const SERVER = 'http://petical-api-develop.ap-northeast-1.elasticbeanstalk.com';
const CLIENT_ID = 'peticalconsole';
const CLIENT_SECRET = 'p3dWz5lKF7WaFeP4lQRy';

export function getAccessToken(token) {
  var auth = new buffer.Buffer(CLIENT_ID + ':' + CLIENT_SECRET);
  return axios.post(`${SERVER}/oauth/token`, {}, {
    headers: {'Authorization': 'Basic ' + auth.toString('base64'), 'Content-Type': 'application/json'},
    params: {'grant_type': 'facebook', 'fb_token': token.accessToken}
  })
    .then(response => {
      return {payload:response.data};
    })
    .catch(error => {
      return {error};
    });
}

function getAuthorizationHeaders() {
  return Session.get().then(session => {
    return Promise.resolve({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session['access_token']
    });
  })
}

export default class API {
  static me() {
    return getAuthorizationHeaders().then(headers => {
      return axios.get(`${SERVER}/api/v1/me`, {headers: headers, params: {}})
        .then(response => {
          return {payload:response.data};
        })
        .catch(error => {
          return {error};
        });
    });
  }
}
