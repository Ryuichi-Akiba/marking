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
  static set(object : Object) {
    return AsyncStorage.setItem(SESSION_STORE_KEY, JSON.stringify(object));
  }

  static setToken(object : Object) {
    return AsyncStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(object));
  }

  /**
   * セッションに保存したオブジェクトを取得します.
   * @returns {Promise.<U>|Promise.<TResult>|Promise<R>|Promise<R2|R1>}
   */
  static get() {
    return AsyncStorage.getItem(SESSION_STORE_KEY).then(json => {
      if (!!json) {
        return Promise.resolve(JSON.parse(json));
      } else {
        return Promise.resolve({});
      }
    });
  }

  static getToken() {
    return AsyncStorage.getItem(TOKEN_STORE_KEY).then(json => {
      if (!!json) {
        return Promise.resolve(JSON.parse(json));
      } else {
        return Promise.resolve({});
      }
    });
  }
}
