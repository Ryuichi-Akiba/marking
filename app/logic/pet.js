import Session from '../common/auth/Session'
import {PETS} from '../common/auth/sessionKey'
import {getMePets} from '../common/api/me'

// ログインユーザーのペットの一覧を取得する
export function loadMyPets(reload : Boolean) {
  return Session.isLoggedIn().then(isLoggedIn => {
    if (isLoggedIn) {
      return loadMyPetsFromCacheIfExists(reload);
    } else {
      return Promise.resolve({payload:[]});
    }
  });
}

// ログインしている場合はセッションかAPI経由でペット一覧を取得する
function loadMyPetsFromCacheIfExists(reload : Boolean) {
  return Session.get(PETS)
    .then(cache => {
      if (!!reload) {
        return getMePets();
      }
      // キャッシュにペットがいなければAPI経由で取得する
      if (!cache || !cache.payload || cache.payload.length === 0) {
        return getMePets();
      } else {
        // キャッシュにペットがいる場合はキャッシュを返す
        console.log('getting user\'s pets information from cache.');
        return Promise.resolve(cache);
      }
    })
    .then(payload => {
      // キャッシュに追加してから返す
      Session.set(PETS, payload); // 非同期で処理する
      return Promise.resolve(payload);
    });
}
