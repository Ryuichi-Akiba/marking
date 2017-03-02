import {get} from './api'

// ログインしているユーザーの基本情報を取得する
export function getMe() {
  return get('/api/v1/me');
}

// ログインしているユーザーが飼育しているペットの情報を取得する
export function getMePets() {
  return get('/api/v1/me/pets');
  // FIXME 後でAPI呼び出しに変更すること
  // return Promise.resolve([
  //   {
  //     "id":"19388edd-791b-420e-b617-ceaa01658c20",
  //     "name":"もも",
  //     "nameKana":"モモ",
  //     "kind":"犬",
  //     "type":"トイプードル",
  //     "color":"白",
  //     "blood":"DEA1.1",
  //     "sex":"FEMALE",
  //     "microchipNo":"1234567890",
  //     "createdDate":"2014-02-13",
  //     "neutral":"0",
  //     "dead":"0",
  //     "profile":"とても人懐っこくカワイイ子です。",
  //     "allergia":"なし。",
  //     "drug":"なし。",
  //     "other":"なし。",
  //     "image":"https://lh3.googleusercontent.com/-O4KgoxHHk9U/AAAAAAAAAAI/AAAAAAAAAAA/AAomvV1Dm81AJIcipavnmbKwptwlQGH8IA/s96-c/photo.jpg",
  //     "createdBy":"3",
  //     "createdDate":"2016-08-26T03:07:59Z",
  //     "lastModifiedBy":"3",
  //     "lastModifiedDate":"2016-08-26T03:07:59Z"
  //   },
  //   {
  //     "id":"19388edd-791b-420e-b617-ceaa01658c20",
  //     "name":"梅",
  //     "nameKana":"ウメ",
  //     "kind":"犬",
  //     "type":"トイプードル",
  //     "color":"白",
  //     "blood":"DEA1.1",
  //     "sex":"FEMALE",
  //     "microchipNo":"1234567890",
  //     "createdDate":"2014-02-13",
  //     "neutral":"0",
  //     "dead":"0",
  //     "profile":"とても人懐っこくカワイイ子です。",
  //     "allergia":"なし。",
  //     "drug":"なし。",
  //     "other":"なし。",
  //     "image":"https://lh3.googleusercontent.com/-O4KgoxHHk9U/AAAAAAAAAAI/AAAAAAAAAAA/AAomvV1Dm81AJIcipavnmbKwptwlQGH8IA/s96-c/photo.jpg",
  //     "createdBy":"3",
  //     "createdDate":"2016-08-26T03:07:59Z",
  //     "lastModifiedBy":"3",
  //     "lastModifiedDate":"2016-08-26T03:07:59Z"
  //   },
  //   {
  //     "id":"19388edd-791b-420e-b617-ceaa01658c20",
  //     "name":"新之助",
  //     "nameKana":"シンノスケ",
  //     "kind":"犬",
  //     "type":"トイプードル",
  //     "color":"白",
  //     "blood":"DEA1.1",
  //     "sex":"FEMALE",
  //     "microchipNo":"1234567890",
  //     "createdDate":"2014-02-13",
  //     "neutral":"0",
  //     "dead":"0",
  //     "profile":"とても人懐っこくカワイイ子です。",
  //     "allergia":"なし。",
  //     "drug":"なし。",
  //     "other":"なし。",
  //     "image":"https://lh3.googleusercontent.com/-O4KgoxHHk9U/AAAAAAAAAAI/AAAAAAAAAAA/AAomvV1Dm81AJIcipavnmbKwptwlQGH8IA/s96-c/photo.jpg",
  //     "createdBy":"3",
  //     "createdDate":"2016-08-26T03:07:59Z",
  //     "lastModifiedBy":"3",
  //     "lastModifiedDate":"2016-08-26T03:07:59Z"
  //   }
  // ]);
}
