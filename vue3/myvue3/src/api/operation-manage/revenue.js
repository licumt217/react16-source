import request from '@/utils/request'

/**
 * 权益包订单列表接口
 * @param data
 */
export function getOrderList(data) {
  return request({
    url: `/shop/equity/getOrderList`,
    method: 'post',
    data: data
  })
}

/**
 * 再次发送权益包接口
 * @param orderId
 */
export function sendAgain({orderId}) {
  return request({
    url: `/shop/equity/doReissued`,
    method: 'post',
    params: {orderId}
  })
}

