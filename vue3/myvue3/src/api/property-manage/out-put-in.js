import request from '@/utils/request'

/**
 * 获取入库产品列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getStockItemList(query) {
  return request({
    url: '/wms/stockItem/list',
    method: 'get',
    params: query
  })
}

/**
 * 入库
 * @param data
 * @returns {AxiosPromise}
 */
export function addStockItem(data) {
  return request({
    url: '/wms/stockItem',
    method: 'post',
    data
  })
}

/**
 * 修改入库产品
 * @param data
 * @returns {AxiosPromise}
 */
export function updateStockItem(data) {
  return request({
    url: '/wms/stockItem',
    method: 'put',
    data
  })
}

// 导出入库产品
export function exportStockItem(query) {
  return request({
    url: '/wms/stockItem/export',
    method: 'get',
    params: query
  })
}


/**
 * 获取订单列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getOrderList(query) {
  return request({
    url: '/wms/order/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加订单
 * @param data
 * @returns {AxiosPromise}
 */
export function addOrder(data) {
  return request({
    url: '/wms/order',
    method: 'post',
    data
  })
}

export function outOrder(data) {
  return request({
    url: '/wms/order/out',
    method: 'post',
    data
  })
}

/**
 * 修改订单
 * @param data
 * @returns {AxiosPromise}
 */
export function updateOrder(data) {
  return request({
    url: '/wms/order',
    method: 'put',
    data
  })
}

// 导出订单
export function exportOrder(query) {
  return request({
    url: '/wms/order/export',
    method: 'get',
    params: query
  })
}

/**
 * 获取订单详情
 * @param orderId
 * @returns {AxiosPromise}
 */
export function getOrderDetail({ orderId }) {
  return request({
    url: `/wms/order/detail/${orderId}`,
    method: 'get'
  })
}
