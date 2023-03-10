import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/ipop-authcenter/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/ipop-authcenter/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/ipop-authcenter/logout'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/ipop-authcenter/captchaImage',
    method: 'get'
  })
}
