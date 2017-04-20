import {get, del} from './api'

// ペットのマーキング情報を取得する（年月指定）
export function getPetsMarkings(petId : string, year : number, month : number) {
  return get(`/api/v1/pets/${petId}/markings/${year}/${month}`);
}
