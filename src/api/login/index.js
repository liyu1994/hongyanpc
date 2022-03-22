import request from '@/plugin/axios'
// const qs = require('qs')

// 管理员登录
export function loginUser({ username, password }) {
  const data = {
    account: username,
    password
  }
  return request({
    url: '/api/administrator/login',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// 用户资料
export function getUserInfo() {
  return request({
    url: '/api/administrator/loginInfo',
    method: 'get'
  })
}
