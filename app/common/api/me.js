import {get, post, del} from './api'

// ログインしているユーザーの基本情報を取得する
export function getMe() {
  return get('/api/v1/me');
}

// ログインしているユーザーが飼育しているペットの情報を取得する
export function getMePets() {
  return get('/api/v1/me/pets');
}

// ログインしているユーザーにペットの情報を追加する
export function postMePets(form) {
  return post('/api/v1/me/pets', form);
}

// ペット用の画像をアップロードする
export function uploadMePetsImage(file) {
  return post('/api/v1/me/pets/upload', file);
}

// ログインしているユーザーが飼育しているペットをアーカイブする
export function deleleMePets(petId : string) {
  return del(`/api/v1/me/pets/${petId}`);
}
