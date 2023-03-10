import request from '@/utils/request'

/**
 * 获取合同列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getContractList(query) {
  return request({
    url: '/parkapi/contract/list',
    params: query
  })
}

/**
 * 获取合同详情
 * @param pmContractId
 * @returns {AxiosPromise}
 */
export function getContractDetail(pmContractId) {
  return request({
    url: `/parkapi/contract/${pmContractId}`
  })
}

/**
 * 添加合同
 * @param data
 * @returns {AxiosPromise}
 */
export function addContract(data) {
  return request({
    url: '/parkapi/contract',
    method: 'post',
    data
  })
}

export function updateContract(data) {
  return request({
    url: '/parkapi/contract',
    method: 'put',
    data
  })
}

/**
 * 获取合同详情中的车场列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getContractParkList(query) {
  return request({
    url: '/parkapi/contract/park/list',
    params: query
  })
}

export function exportContract(query) {
  return request({
    url: '/parkapi/contract/export',
    params: query
  })
}

export function exportContractPark(query) {
  return request({
    url: '/parkapi/contract/park/export',
    params: query
  })
}

export function getContractDetailByPmContractParkId({ pmContractParkId }) {
  return request({
    url: `/parkapi/contract/park/${pmContractParkId}`
  })
}
