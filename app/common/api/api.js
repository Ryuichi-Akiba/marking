import axios from 'axios'
import buffer from 'buffer'
import Session from '../auth/Session'

// TODO 環境依存設定なので、どこかに移動したい（動作環境に応じて設定を切り替えられるように）
// export const SERVER = 'http://petical-api-develop.ap-northeast-1.elasticbeanstalk.com';
// const CLIENT_ID = 'peticalconsole';
// const CLIENT_SECRET = 'p3dWz5lKF7WaFeP4lQRy';
export const SERVER = 'http://localhost:8080';
const CLIENT_ID = 'majimenatestapp';
const CLIENT_SECRET = 'mySecretOAuthSecret';

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
      return {error:error.response};
    });
}

function getAuthorizationHeaders() {
  return Session.getToken().then(session => {
    return Promise.resolve({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + session['access_token']
    });
  })
}

// HTTP REQUEST [GET]
export function get(uri, params) {
  return getAuthorizationHeaders().then(headers => {
    params = !!params ? params : {};
    console.log(`call api [GET] ${SERVER}${uri}`);

    return axios.get(`${SERVER}${uri}`, {headers: headers, params: params})
      .then(response => {
        return {payload:response.data};
      })
      .catch(error => {
        return {error:error.response};
      });
  });
}

// HTTP REQUEST [POST]
export function post(uri, data, params) {
  return getAuthorizationHeaders().then(headers => {
    data = !!data ? data : {};
    params = !!params ? params : {};
    console.log(`call api [POST] ${SERVER}${uri}`);

    return axios.post(`${SERVER}${uri}`, data, {headers: headers, params: params})
      .then(response => {
        if (response.status < 200 && response.status > 299) {
          return Promise.reject({error:response.data});
        }
        if (!response.data || response.data === '') {
          return {payload:{}};
        }
        return {payload:response.data};
      })
      .catch(error => {
        return {error:error.response};
      });
  });
}

// HTTP REQUEST [DELETE]
export function del(uri, params) {
  return getAuthorizationHeaders().then(headers => {
    params = !!params ? params : {};
    console.log(`call api [DELETE] ${SERVER}${uri}`);

    return axios.delete(`${SERVER}${uri}`, {headers: headers, params: params})
      .then(response => {
        return {payload:response.data};
      })
      .catch(error => {
        return {error:error.response};
      });
  });
}
