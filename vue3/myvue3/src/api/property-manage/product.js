import request from '@/utils/request'

/**
 * 获取产品列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getProductList(query) {
  return request({
    url: '/wms/item/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取产品详情
 * @param id
 * @returns {AxiosPromise}
 */
export function getProductDetail({id}) {
  return request({
    url: `/wms/item/${id}`,
    method: 'get'
  })
}

/**
 * 添加产品
 * @param data
 * @returns {AxiosPromise}
 */
export function addProduct(data) {
  return request({
    url: '/wms/item',
    method: 'post',
    data
  })
}

/**
 * 添加产品
 * @param data
 * @returns {AxiosPromise}
 */
export function updateProduct(data) {
  return request({
    url: '/wms/item',
    method: 'put',
    data
  })
}


/**
 * 导出产品
 * @param data
 * @returns {AxiosPromise}
 */
export function exportProduct(query) {
  return request({
    url: '/wms/item/export',
    method: 'get',
    params: query
  })
}
