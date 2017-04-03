import {AsyncStorage} from 'react-native'

const SESSION_STORE_KEY = 'mjm_marking_session';
const TOKEN_STORE_KEY = 'mjm_marking_token';

/**
 * セッション.
 */
export default class Session {
  /**
   * セッションにオブジェクトを保存します.
   * @param object オブジェクト
   * @returns {*|Promise}
   */
  static set(key : string, object : Object) {
    return AsyncStorage.setItem(SESSION_STORE_KEY + "_" + key, JSON.stringify(object));
  }

  /**
   * セッションに保存したオブジェクトを取得します.
   * @returns {Promise.<U>|Promise.<TResult>|Promise<R>|Promise<R2|R1>}
   */
  static get(key : string) {
    return AsyncStorage.getItem(SESSION_STORE_KEY + "_" + key).then(json => {
      if (!!json) {
        return Promise.resolve(JSON.parse(json));
      } else {
        return Promise.resolve(null);
      }
    });
  }

  static setToken(object : Object) {
    return AsyncStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(object));
  }

  static getToken() {
    return AsyncStorage.getItem(TOKEN_STORE_KEY).then(json => {
      if (!!json) {
        return Promise.resolve(JSON.parse(json));
      } else {
        return Promise.resolve(null);
      }
    });
  }

  static isLoggedIn() {
    return this.getToken().then(token => {
      return Promise.resolve(!!token && !!token['access_token']);
    }).catch(error => {
      return Promise.resolve(false);
    })
  }

  /**
   * セッションに保存されている情報を全て破棄する.
   */
  static destroy() {
    return AsyncStorage.clear((result) => result);
  }
}
