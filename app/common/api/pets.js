import {get} from './api'

// ペットのマーキング情報を取得する（年月日指定）
export function getPetsWalkings(petId : string, year : number, month : number, date : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}/${date}`);
}

export function getPetsWalkingsByMonth(petId : string, year : number, month : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}`);
}
