import request from '@/utils/request'

export function getTagList(query) {
  return request({
    url: '/parkapi/tag/list',
    params: query
  })
}

export function getAssociatedTagList(query) {
  return request({
    url: '/parkapi/park/tag/list',
    params: query
  })
}

export function addTag(data) {
  return request({
    url: '/parkapi/tag',
    method: 'post',
    data
  })
}

export function getTagByContractId(pmContractParkId) {
  return request({
    url: `/parkapi/park/tag/parkTag/${pmContractParkId}`
  })
}

export function updateTagByContractId(data) {
  return request({
    url: `/parkapi/park/tag/parkTag`,
    method: 'put',
    data
  })
}

export function getAssociatedParkListByTagId({ tagId, pageNum, pageSize }) {
  return request({
    url: `/parkapi/park/tag/parkList/${tagId}`,
    params: {
      pageNum, pageSize
    }
  })
}

export function getTagInfo({ tagId }) {
  return request({
    url: `/parkapi/tag/${tagId}`
  })
}

export function deleteTag({ tagId }) {
  return request({
    url: `/parkapi/tag/${tagId}`,
    method: 'delete'
  })
}
