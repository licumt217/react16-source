import request from '@/utils/request'

/**
 * 获取品牌列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getStoreHouseList(query) {
  return request({
    url: '/wms/storehouse/list',
    method: 'get',
    params: query
  })
}

export function getStoreHouseDetail({storehouseId}) {
  return request({
    url: `/wms/storehouse/${storehouseId}`,
    method: 'get',
  })
}

export function getStorageByStorehouse(query) {
  return request({
    url: '/wms/storage/list',
    method: 'get',
    params: query
  })
}

export function exportStorage(query) {
  return request({
    url: '/wms/storage/export',
    method: 'get',
    params: query
  })
}

/**
 * 添加品牌
 * @param data
 * @returns {AxiosPromise}
 */
export function addStoreHouse(data) {
  return request({
    url: '/wms/storehouse',
    method: 'post',
    data
  })
}

/**
 * 修改品牌
 * @param data
 * @returns {AxiosPromise}
 */
export function updateStoreHouse(data) {
  return request({
    url: '/wms/storehouse',
    method: 'put',
    data
  })
}

// 导出品牌
export function exportStoreHouse(query) {
  return request({
    url: '/wms/storehouse/export',
    method: 'get',
    params: query
  })
}

export function getSenderOrReceiverList() {
  return request({
    url: '/wms/storehouse/senderOrReceiverList',
    method: 'get'
  })
}
