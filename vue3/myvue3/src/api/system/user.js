import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/tools";

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/ipop-authcenter/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/ipop-authcenter/system/user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/ipop-authcenter/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/ipop-authcenter/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/ipop-authcenter/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/ipop-authcenter/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/ipop-authcenter/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/ipop-authcenter/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/ipop-authcenter/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/ipop-authcenter/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/ipop-authcenter/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/ipop-authcenter/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/ipop-authcenter/system/user/importTemplate',
    method: 'get'
  })
}
