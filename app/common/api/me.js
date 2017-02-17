import {get} from './api'

export function getMe() {
  return get('/api/v1/me');
}
