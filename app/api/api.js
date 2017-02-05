import axios from 'axios'
import buffer from 'buffer'

// TODO 環境依存設定なので、どこかに移動したい（動作環境に応じて設定を切り替えられるように）
const server = 'http://localhost:8080';
const clientId = 'majimenatestapp';
const clientSecret = 'mySecretOAuthSecret';

export function user(id) {
  return fetch(`http://localhost:8080/users/${id}`)
    .then(res => res.json())
    .then(payload => {
      payload
    })
    .catch(error => {
      error
    });
}

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
