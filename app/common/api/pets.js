import {get} from './api'

// ペットの散歩情報を取得する（年月日指定）
export function getPetsWalkings(petId : string, year : number, month : number, date : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}/${date}`);
}

// ペットの散歩情報を取得する（年月指定）
export function getPetsWalkingsByMonth(petId : string, year : number, month : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}`);
}

// ペットの直近の散歩情報を取得する
export function getPetsRecentlyWalkings(petId : string) {
  return get(`/v1/pets/${petId}/walkings`);
}
