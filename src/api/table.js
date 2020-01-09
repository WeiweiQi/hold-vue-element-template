import request from '@/utils/request'

export function getList(params) {
  console.log('params:' + params)
  return request({
    url: '/vuelogin/list',
    method: 'get',
    params
  })
}
