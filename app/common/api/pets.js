import {get, del} from './api'

// ペットのマーキング情報を取得する（年月日指定）
export function getPetsMarkings(petId : string, year : number, month : number, date : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}/${date}`);
}

export function getPetsMarkingsByMonth(petId : string, year : number, month : number) {
  return get(`/v1/pets/${petId}/walkings/${year}/${month}`);
}
