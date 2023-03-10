import request from '@/utils/request'

// 查询消息推送列表
export function messageList(query) {
  return request({
    url: '/ipop-authcenter/devops/message/list',
    method: 'get',
    params: {
      ...query
    }
  })
}

// 导出消息列表
export function exportMessage(query) {
  return request({
    url: '/ipop-authcenter/devops/message/export',
    method: 'get',
    params: {
      ...query
    }
  })
}

// 查询接收人管理列表
export function receiveUserList(query) {
  return request({
    url: '/ipop-authcenter/devops/user/list',
    method: 'get',
    params: {
      ...query
    }
  })
}

// 删除某条接收人信息
export function receiveUserDelete(id) {
  return request({
    url: `/ipop-authcenter/devops/user/${id}`,
    method: 'delete'
  })
}

// 添加接收人
export function receiveUserAdd(data) {
  return request({
    url: '/ipop-authcenter/devops/user',
    method: 'post',
    data
  })
}

// 导出接收人
export function exportReceiveUser(query) {
  return request({
    url: '/ipop-authcenter/devops/user/export',
    method: 'get',
    params: {
      ...query
    }
  })
}
