import request from '@/utils/request'

// 查询实施自定义日志列表
export function listLog(query) {
  return request({
    url: '/ipop-authcenter/devops/log/list',
    method: 'get',
    params: {
      ...query,
      isAsc: 'desc',
      orderByColumn: 'upload_dt'
    }
  })
}

// 查询实施自定义日志详细
export function getLog(id) {
  return request({
    url: '/ipop-authcenter/devops/log/' + id,
    method: 'get'
  })
}

// 新增实施自定义日志
export function addLog(data) {
  return request({
    url: '/ipop-authcenter/devops/log',
    method: 'post',
    data: data
  })
}

// 修改实施自定义日志
export function updateLog(data) {
  return request({
    url: '/ipop-authcenter/devops/log',
    method: 'put',
    data: data
  })
}

// 删除实施自定义日志
export function delLog(id) {
  return request({
    url: '/ipop-authcenter/devops/log/' + id,
    method: 'delete'
  })
}

// 导出实施自定义日志
export function exportLog(query) {
  return request({
    url: '/ipop-authcenter/devops/log/export',
    method: 'get',
    params: query
  })
}
