import request from '@/utils/request'

// get
export function get(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

// post
export function post(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

// delete
export function deleteById(url, id, data) {
  return request({
    url: `${url}/${id}`,
    method: 'delete',
    data
  })
}

// put
export function putById(url, id, data) {
  return request({
    url: `${url}/${id}`,
    method: 'put',
    data
  })
}

// patch
export function patchById(url, id, data) {
  return request({
    url: `${url}/${id}`,
    method: 'patch',
    data
  })
}