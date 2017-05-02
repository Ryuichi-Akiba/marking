import axios from 'axios'
import * as constants from '../constants'
import * as auth from '../auth/auth'
import Session from '../auth/Session'

// HTTP REQUEST [GET]
export function get(uri, params) {
  return getAuthorizationHeaders().then(headers => {
    params = !!params ? params : {};
    console.log(`call api [GET] ${constants.SERVER}${uri}`);

    return axios.get(`${constants.SERVER}${uri}`, {headers: headers, params: params})
      .then(response => handleResponse(response))
      .catch(error => handleAuthorizationError(error, () => get(uri, params)))
      .catch(error => handleError(error));
  });
}

// HTTP REQUEST [POST]
export function post(uri, data, params) {
  return getAuthorizationHeaders().then(headers => {
    data = !!data ? data : {};
    params = !!params ? params : {};
    console.log(`call api [POST] ${constants.SERVER}${uri}`);

    return axios.post(`${constants.SERVER}${uri}`, data, {headers: headers, params: params})
      .then(response => handleResponse(response))
      .catch(error => handleAuthorizationError(error, () => post(uri, data, params)))
      .catch(error => handleError(error));
  });
}

// HTTP REQUEST [DELETE]
export function del(uri, params) {
  return getAuthorizationHeaders().then(headers => {
    params = !!params ? params : {};
    console.log(`call api [DELETE] ${constants.SERVER}${uri}`);

    return axios.delete(`${constants.SERVER}${uri}`, {headers: headers, params: params})
      .then(response => handleResponse(response))
      .catch(error => handleAuthorizationError(error, () => del(uri, params)))
      .catch(error => handleError(error));
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

function handleAuthorizationError(error, callback) {
  // 認証エラーの場合は、アクセストークンをもう一度取り直してみる（トークン期限切れなら再取得できるので）
  if (error.response.status === 401) {
    // TODO 他のログインを実装したら、フェイスブックでログインしているか否かの条件分岐が必要になるので注意すること
    // フェイスブックのログインが切れていなければ、それを元にトークンを再取得する
    return auth.loginWithFacebook().then(callback);
  }

  // そうじゃない場合はリジェクトして他のエラー処理に回す
  return Promise.reject(error);
}

function handleResponse(response) {
  // 200系以外はエラーとして扱う
  if (response.status < 200 && response.status > 299) {
    return Promise.reject({error:response.data});
  }
  // レスポンスがない場合は空オブジェクトを成功状態で返す
  if (!response.data || response.data === '') {
    return Promise.resolve({payload:{}});
  }
  // 正常系なのでそのまま結果をpayloadとして返す
  return Promise.resolve({payload:response.data});
}

function handleError(error) {
  return {error:error.response};
}
