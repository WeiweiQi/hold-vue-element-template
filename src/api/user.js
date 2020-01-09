import request from '@/utils/request'

export function login(data) {
  console.log('user/login...')
  console.log('data:' + data.username)
  return request({
    url: '/vuelogin/mylogin',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    },
    data
  })
}

export function mylogin(data) {
  return request({
    url: '/vuelogin/mylogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vuelogin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vuelogin/logout',
    method: 'post'
  })
}
