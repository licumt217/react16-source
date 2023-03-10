import request from '@/utils/request'

/**
 * 获取标签列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getTagList(query) {
  return request({
    url: '/wms/tag/list',
    method: 'get',
    params: query
  })
}

/**
 * 添加标签
 * @param data
 * @returns {AxiosPromise}
 */
export function addTag(data) {
  return request({
    url: '/wms/tag',
    method: 'post',
    data
  })
}

/**
 * 修改标签
 * @param data
 * @returns {AxiosPromise}
 */
export function updateTag(data) {
  return request({
    url: '/wms/tag',
    method: 'put',
    data
  })
}

// 导出标签
export function exportTag(query) {
  return request({
    url: '/wms/tag/export',
    method: 'get',
    params: query
  })
}
