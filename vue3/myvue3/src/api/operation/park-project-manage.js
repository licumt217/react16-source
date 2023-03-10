import request from '@/utils/request'

export function getContractList(query) {
  return request({
    url: '/parkapi/contract/park/list',
    params: query
  })
}

export function deleteAssociateContract(pmContractParkIds) {
  return request({
    url: `/parkapi/contract/park/${pmContractParkIds}`,
    method: 'delete'
  })
}

export function getContractDetail(pmContractId) {
  return request({
    url: `/parkapi/contract/${pmContractId}`
  })
}

export function updateParkProjectInfo(data) {
  return request({
    url: '/parkapi/contract/park',
    method: 'put',
    data
  })
}

export function updateAssociateContractState({ pmContractParkId, isHide }) {
  return request({
    url: `/parkapi/contract/park/hide/${pmContractParkId}/${isHide}`,
    method: 'put'
  })
}

export function getAllContractParkList() {
  return request({
    url: '/parkapi/contract/park/getAllContractParkList'
  })
}
