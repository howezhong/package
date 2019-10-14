/*
 * 所有请求接口
 */

import { get, post } from './http'

export const query = params => {
  return get('/query', params)
}

export const upload = data => {
  return post('/upload', data)
}
