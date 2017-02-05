import {AsyncStorage} from 'react-native'

const STORE_KEY = '@Marking:Session';

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
    return AsyncStorage.setItem(STORE_KEY, JSON.stringify(object));
  }

  /**
   * セッションに保存したオブジェクトを取得します.
   * @returns {Promise.<U>|Promise.<TResult>|Promise<R>|Promise<R2|R1>}
   */
  static get() {
    return AsyncStorage.getItem(STORE_KEY).then(json => {
      if (json) {
        return Promise.resolve(JSON.parse(json));
      } else {
        return Promise.resolve(json);
      }
    });
  }
}
