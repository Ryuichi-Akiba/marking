import axios from 'axios'
import buffer from 'buffer'
import Session from '../commons/Session'

// TODO 環境依存設定なので、どこかに移動したい（動作環境に応じて設定を切り替えられるように）
const server = 'http://192.168.1.61:8080';
const clientId = 'majimenatestapp';
const clientSecret = 'mySecretOAuthSecret';

export function getAccessToken(token) {
  var auth = new buffer.Buffer(clientId + ':' + clientSecret);
  return axios.post(`${server}/oauth/token`, {}, {
    headers: {'Authorization': 'Basic ' + auth.toString('base64')},
    params: {'grant_type': 'facebook', 'fb_token': token.accessToken}
  })
    .then(response => {
      return {payload:response.data};
    })
    .catch(error => {
      error
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
      return axios.get(`${server}/api/v1/me`, {headers: headers, params: {}})
        .then(response => {
          return {payload:response.data};
        })
        .catch(error => {
          return {error};
        });
    });
  }
}
