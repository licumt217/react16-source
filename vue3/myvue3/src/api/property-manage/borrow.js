import request from '@/utils/request'

export function getBorrowProductList(data) {
  return request({
    url: '/wms/borrow/itemList',
    method: 'get',
    params: data
  })
}

export function getBorrowOrderList(data) {
  return request({
    url: '/wms/borrow/orderList',
    method: 'get',
    params: data
  })
}

export function returnProduct({stockItemId}) {
  return request({
    url: `/wms/borrow/returnItem/${stockItemId}`,
    method: 'post'
  })
}

export function returnOrder({orderId,remarks}) {
  return request({
    url: `/wms/borrow/returnOrder/${orderId}`,
    method: 'post',
    params: {remarks}
  })
}

export function exportProduct({updateBy, orderId, itemName, deviceId, receiveId, sendId, isBorrow}) {
  return request({
    url: '/wms/borrow/itemExport',
    method: 'get',
    params: {updateBy, orderId, itemName, deviceId, receiveId, sendId, isBorrow}
  })
}

export function exportOrder({updateBy, orderId, itemName, deviceId, receiveId, sendId, isBorrow}) {
  return request({
    url: '/wms/borrow/orderExport',
    method: 'get',
    params: {updateBy, orderId, itemName, deviceId, receiveId, sendId, isBorrow}
  })
}
