import {get} from './api'

// 品種を取得する
export function getBreeds() {
  return get(`/api/v1/breeds`);
}
