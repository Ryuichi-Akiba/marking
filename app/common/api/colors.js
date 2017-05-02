import {get} from './api'

// 毛色を取得する
export function getColors() {
  return get(`/api/v1/colors`);
}
