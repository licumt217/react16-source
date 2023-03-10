import request from '@/utils/request'

/**
 * 获取发票账单
 * @param businessTypes
 * @param pmParkId
 * @param states
 * @param startDate
 * @param endDate
 * @param applyId
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getInvoiceBillList({ businessTypes, pmParkId, states, startDate, endDate, applyId, start, limit }) {
  return request({
    url: '/tcAccountCheck/settle/getPoundageMonthBill',
    method: 'post',
    data: {
      businessTypes, pmParkId, states, startDate, endDate, applyId, start, limit
    }
  })
}

/**
 * 全部开票 校验
 * @param businessTypes
 * @param pmParkId
 * @param states
 * @param startDate
 * @param endDate
 * @returns {AxiosPromise}
 */
export function invoiceAllCheck({ businessTypes, pmParkId, states, startDate, endDate }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceAllCheck',
    method: 'post',
    data: {
      businessTypes, pmParkId, states, startDate, endDate
    }
  })
}

/**
 * 批量选择开票 校验
 * @param ids
 * @param pmParkIds
 * @returns {AxiosPromise}
 */
export function invoiceBatchCheck({ ids, pmParkId }) {
  return request({
    url: '/tcAccountCheck/settle/invoiceBatchCheck',
    method: 'post',
    data: {
      ids, pmParkId
    }
  })
}

/**
 * 账单明细
 * @param poundageBilld
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getCheckDetail({ poundageBillId, start, limit }) {
  return request({
    url: '/tcAccountCheck/settle/getSettleList',
    method: 'post',
    data: {
      poundageBillId, start, limit
    }
  })
}

/**
 * 申请开蓝票
 * @param preId
 * @param applyUserId
 * @param deptId
 * @param applyUserType
 * @param applyUserName
 * @param invoiceType
 * @returns {AxiosPromise}
 */
export function applyBlueInvoice({ preId, applyUserId, deptId, ddUserId, applyUserType, applyUserName, invoiceType,applyUserPhone }) {
  return request({
    url: '/tcAccountCheck/settle/applyBlueInvoicePre',
    method: 'post',
    data: {
      preId, applyUserId, deptId, ddUserId, applyUserType, applyUserName, invoiceType,applyUserPhone
    }
  })
}

/**
 * 申请开红票
 * @param applyId
 * @param applyUserId
 * @param deptId
 * @param applyUserType
 * @param applyUserName
 * @returns {AxiosPromise}
 */
export function applyRedInvoice({ applyId, applyUserId, deptId, ddUserId, applyUserType, applyUserName,applyUserPhone}) {
  return request({
    url: '/tcAccountCheck/settle/applyRedInvoicePre',
    method: 'post',
    data: {
      applyId, applyUserId, deptId, ddUserId, applyUserType, applyUserName,applyUserPhone
    }
  })
}

/**
 * 发票批次
 * @param applyStartDate
 * @param applyEndDate
 * @param successStartDate
 * @param successEndDate
 * @param pmParkId
 * @param applyId
 * @param states
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getInvoiceApplyList({ userType, applyStartDate, applyEndDate, successStartDate, successEndDate, pmParkId, applyId, invoiceTypes, states, ddStates, invoiceSuccessMonth, start, limit }) {
  return request({
    url: '/tcAccountCheck/settle/getInvoiceApplyList',
    method: 'post',
    data: {
      userType, applyStartDate, applyEndDate, successStartDate, successEndDate, pmParkId, applyId, invoiceTypes, states, ddStates, invoiceSuccessMonth, start, limit
    }
  })
}

/**
 * 发票账单导出
 * @param businessTypes
 * @param pmParkId
 * @param states
 * @param startDate
 * @param endDate
 * @param applyId
 * @returns {AxiosPromise}
 */
export function invoiceBillExport({ businessTypes, pmParkId, states, startDate, endDate, applyId }) {
  return request({
    url: '/tcAccountCheck/settle/getPoundageMonthBillFile',
    method: 'post',
    data: {
      businessTypes, pmParkId, states, startDate, endDate, applyId
    }
  })
}



/**
 * 发票批次导出
 * @param userType
 * @param applyStartDate
 * @param applyEndDate
 * @param successStartDate
 * @param successEndDate
 * @param pmParkId
 * @param applyId
 * @param invoiceTypes
 * @param states
 * @returns {AxiosPromise}
 */
export function invoiceApplyNoteExport({ userType, applyStartDate, applyEndDate, successStartDate, successEndDate, pmParkId, applyId, invoiceTypes, states, ddStates }) {
  return request({
    url: '/tcAccountCheck/settle/getInvoiceApplyListFile',
    method: 'post',
    data: {
      userType, applyStartDate, applyEndDate, successStartDate, successEndDate, pmParkId, applyId, invoiceTypes, states, ddStates
    }
  })
}

/**
 * 账单明细导出
 * @param poundageBillId
 * @returns {AxiosPromise}
 */
export function invoiceBillDetailExport({ poundageBillId }) {
  return request({
    url: '/tcAccountCheck/settle/getSettleListFile',
    method: 'post',
    data: {
      poundageBillId
    }
  })
}
