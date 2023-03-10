import request from '@/utils/request'

/**
 * 获取 开具的发票统计列表
 * @param startMonth
 * @param endMonth
 * @returns {AxiosPromise}
 */
export function getInvoiceList({ startMonth, endMonth, start, limit }) {
  return request({
    url: 'tcAccountCheck/settle/invoiceStatistics',
    method: 'post',
    data: {
      startMonth,
      endMonth,
      start,
      limit
    }
  })
}

/**
 * 电子发票批量开票
 * @param applyIds
 * @returns {AxiosPromise}
 */
export function invoiceEleBatchCheck({ applyIds }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceElecBatch',
    method: 'post',
    data: {
      applyIds
    }
  })
}

/**
 * 电子发票全部开票
 * @param pmParkId
 * @param applyId
 * @param states
 * @param applyStartDate
 * @param applyEndDate
 * @returns {AxiosPromise}
 */
export function invoiceEleAllCheck({ pmParkId, applyId, states, applyStartDate, applyEndDate }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceElecAll',
    method: 'post',
    data: {
      pmParkId, applyId, states, applyStartDate, applyEndDate
    }
  })
}

/**
 * 非电子发票批量开票
 * @param applyIds
 * @returns {AxiosPromise}
 */
export function invoiceOtherBatchCheck({ applyIds }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceOtherBatch',
    method: 'post',
    data: {
      applyIds
    }
  })
}

/**
 * 非电子发票全部开票
 * @param pmParkId
 * @param applyId
 * @param states
 * @param applyStartDate
 * @param applyEndDate
 * @returns {AxiosPromise}
 */
export function invoiceOtherAllCheck({ pmParkId, applyId, states, applyStartDate, applyEndDate }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceOtherAll',
    method: 'post',
    data: {
      pmParkId, applyId, states, applyStartDate, applyEndDate
    }
  })
}

/**
 * 下载发票申请单
 * @param invoiceSuccessMonth
 * @returns {AxiosPromise}
 */
export function downloadInvoiceApplyFile({ invoiceSuccessMonth }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceStatisticsApplyFile',
    method: 'post',
    data: {
      invoiceSuccessMonth
    }
  })
}
