import request from '@/utils/request'

/**
 * 获取在途
 * @param query
 * @returns {AxiosPromise}
 */
export function getOnPassageInfoByOrder(query) {
  return request({
    url: '/wms/onWay/order/list',
    method: 'get',
    params: query
  })
}

export function getOnPassageInfoByProduct(query) {
  return request({
    url: '/wms/onWay/item/list',
    method: 'get',
    params: query
  })
}

export function addTrackingNo({orderId, trackingNo}) {
  return request({
    url: `/wms/onWay/addTrackingNo/${orderId}`,
    method: 'get',
    params: {
      trackingNo
    }
  })
}

export function receiveItem({stockItemId}) {
  return request({
    url: `/wms/onWay/receiveItem/${stockItemId}`,
    method: 'get'
  })
}

export function receiveProduct({stockItemId}) {
  return request({
    url: `/wms/onWay/receiveItem/${stockItemId}`,
    method: 'get'
  })
}

export function receiveOrder({orderId}) {
  return request({
    url: `/wms/onWay/receiveOrder/${orderId}`,
    method: 'get'
  })
}

export function exportOnWayOrder(query) {
  return request({
    url: `/wms/onWay/order/export`,
    method: 'get',
    params: query
  })
}

export function exportOnWayProduct(query) {
  return request({
    url: `/wms/onWay/item/export`,
    method: 'get',
    params: query
  })
}

export function getOperatorList() {
  return request({
    url: '/wms/user/userSelectList',
    method: 'get'
  })
}
