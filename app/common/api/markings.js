import {post} from './api';

export function postMarkings(data) {
  return post('/api/v1/markings', data);
}