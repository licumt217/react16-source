import request from '@/utils/request'

/**
 * 获取设备类型列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getDeviceTypeList(query) {
  return request({
    url: '/wms/device/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加设备类型
 * @param data
 * @returns {AxiosPromise}
 */
export function addDeviceType(data) {
  return request({
    url: '/wms/device',
    method: 'post',
    data
  })
}

/**
 * 修改设备类型
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDeviceType(data) {
  return request({
    url: '/wms/device',
    method: 'put',
    data
  })
}

// 导出角色
export function exportDeviceType(query) {
  return request({
    url: '/wms/device/export',
    method: 'get',
    params: query
  })
}
