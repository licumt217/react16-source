import request from '@/utils/request'

/**
 *8、查询需要结算给停简单的订单
 * @param startMonth
 * @param endMonth
 * @returns {AxiosPromise}
 */
export function getTjdSettleOrder({ startDate, endDate, start, limit }) {
  return request({
    url: '/tcAccountCheck/yzt/getTjdSettleOrder',
    method: 'post',
    data: {
      startDate,
      endDate,
      start,
      limit
    }
  })
}

/**
 *9、查询需要结算给停简单的订单各项汇总
 * @param startMonth
 * @param endMonth
 * @returns {AxiosPromise}
 */
export function getTjdSettleOrderSum({ startDate, endDate }) {
  return request({
    url: '/tcAccountCheck/yzt/getTjdSettleOrderSum',
    method: 'post',
    data: {
      startDate,
      endDate,
    }
  })
}

/**
 *10、查询单个需要结算给停简单的订单各项汇总
 * @param startMonth
 * @param endMonth
 * @returns {AxiosPromise}
 */
export function getTjdSettleOrderSumById(id) {
  return request({
    url: `/tcAccountCheck/yzt/getTjdSettleOrderSumById/${id}`,
    method: 'post',
    data: {
    }
  })
}

/**
 *11、查询单个需要结算给停简单的订单明细
 * @returns {AxiosPromise}
 */
export function selectSettleOrderDetailById({
  id,start,limit
}) {
  return request({
    url: `/tcAccountCheck/yzt/selectSettleOrderDetailById/${id}`,
    method: 'post',
    data: {
      start,
      limit
    }
  })
}




/**
 * 12、查询单个需要结算给停简单的订单明细excel
 * @param invoiceSuccessMonth
 * @returns {AxiosPromise}
 */
export function selectSettleOrderDetailByIdExcel(id) {
  return request({
    url: `/tcAccountCheck/yzt/selectSettleOrderDetailByIdExcel/${id}`,
    method: 'post',
    data: {
    }
  })
}

/**
 * 13、查询多个需要结算给停简单的订单明细excel
 * @param invoiceSuccessMonth
 * @returns {AxiosPromise}
 */
export function selectSettleOrderDetailExcel({startDate,endDate}) {
  return request({
    url: `/tcAccountCheck/yzt/selectSettleOrderDetailExcel`,
    method: 'post',
    data: {
      startDate,endDate
    }
  })
}
