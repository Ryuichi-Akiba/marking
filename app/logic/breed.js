import Session from '../common/auth/Session'
import {getBreeds} from '../common/api/breeds'

const CACHE_KEY = 'Breeds';

// 品種の一覧を取得する
export function loadBreeds(reload : Boolean) {
  return Session.isLoggedIn().then(isLoggedIn => {
    if (isLoggedIn) {
      return loadBreedsFromCacheIfExists(reload);
    } else {
      return Promise.resolve({payload:[]});
    }
  });
}

// ログインしている場合はセッションかAPI経由で毛色一覧を取得する
function loadBreedsFromCacheIfExists(reload : Boolean) {
  return Session.get(CACHE_KEY)
    .then(cache => {
      if (!!reload) {
        return getBreeds();
      }
      // キャッシュがなければAPI経由で取得する
      if (!cache || !cache.payload || cache.payload.length === 0) {
        return getBreeds();
      } else {
        // キャッシュがある場合はキャッシュを返す
        console.log('getting breed list from cache.');
        return Promise.resolve(cache);
      }
    })
    .then(payload => {
      // キャッシュに追加してから返す
      Session.set(CACHE_KEY, payload); // 非同期で処理する
      return Promise.resolve(payload);
    });
}
