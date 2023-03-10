import request from '@/utils/request'

/**
 * 获取品牌列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getBrandList(query) {
  return request({
    url: '/wms/brand/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加品牌
 * @param data
 * @returns {AxiosPromise}
 */
export function addBrand(data) {
  return request({
    url: '/wms/brand',
    method: 'post',
    data
  })
}

/**
 * 修改品牌
 * @param data
 * @returns {AxiosPromise}
 */
export function updateBrand(data) {
  return request({
    url: '/wms/brand',
    method: 'put',
    data
  })
}

// 导出品牌
export function exportBrand(query) {
  return request({
    url: '/wms/brand/export',
    method: 'get',
    params: query
  })
}
