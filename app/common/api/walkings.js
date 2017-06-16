import {post} from './api';

export function postWalking(data) {
  return post('/v1/walkings', data);
}
