import Session from '../common/auth/Session'
import {getColors} from '../common/api/colors'

const CACHE_KEY = 'Colors';

// 毛色の一覧を取得する
export function loadColors(reload : Boolean) {
  return Session.isLoggedIn().then(isLoggedIn => {
    if (isLoggedIn) {
      return loadColorsFromCacheIfExists(reload);
    } else {
      return Promise.resolve({payload:[]});
    }
  });
}

// ログインしている場合はセッションかAPI経由で毛色一覧を取得する
function loadColorsFromCacheIfExists(reload : Boolean) {
  return Session.get(CACHE_KEY)
    .then(cache => {
      if (!!reload) {
        return getColors();
      }
      // キャッシュがなければAPI経由で取得する
      if (!cache || !cache.payload || cache.payload.length === 0) {
        return getColors();
      } else {
        // キャッシュがある場合はキャッシュを返す
        console.log('getting color list from cache.');
        return Promise.resolve(cache);
      }
    })
    .then(payload => {
      // キャッシュに追加してから返す
      Session.set(CACHE_KEY, payload); // 非同期で処理する
      return Promise.resolve(payload);
    });
}
