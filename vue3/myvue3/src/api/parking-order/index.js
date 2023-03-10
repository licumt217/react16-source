import request from '@/utils/request'

/**
 * 获取列表
 * @param currentResult
 * @param showCount
 * @param parkId
 * @param parkOrderId
 * @param carNum
 * @param inStartDt
 * @param inEndDt
 * @returns {AxiosPromise}
 */
export function getExceptionOrderList({ currentResult, showCount, parkId, parkOrderId, carNum, inStartDt, inEndDt }) {
    return request({
        url: '/parkzip/parkOrder/exception/listBody',
        params: {
            currentResult, showCount, parkId, parkOrderId, carNum, inStartDt, inEndDt, draw: 1
        }
    })
}

/**
 * 获取详情
 * @param parkOrderId
 * @returns {AxiosPromise}
 */
export function getExceptionOrderDetail({ parkOrderId, currentResult, showCount }) {
    return request({
        url: '/parkzip/parkOrder/exception/detail',
        params: {
            parkOrderId,
            currentResult,
            showCount,
            draw: 1
        }
    })
}

/**
 * 支付宝平台删单
 * @param parkId
 * @param parkOrderId
 * @param carNum
 * @returns {AxiosPromise}
 */
export function alipayDeleteOrder({ parkId, parkOrderId, carNum }) {
    return request({
        url: '/parkzip/parkOrder/delParkOrderByIpsp',
        method: 'post',
        data: {
            parkId, parkOrderId, carNum
        }
    })
}

/**
 * 获取在场订单
 * @param pmParkId
 * @param carNum
 * @param phone
 * @param inStartDate
 * @param inEndDate
 * @param omParkInfoId
 * @param isHasCarNum
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getInParkList({ pmParkId, carNum, phone, inStartDate, inEndDate, omParkInfoId, isHasCarNum, start, limit }) {
    return request({
        url: '/tcbstats/orderRest/inParkListForNewMgr',
        method: 'post',
        data: {
            pmParkId, carNum, phone, inStartDate, inEndDate, omParkInfoId, isHasCarNum, start, limit
        }
    })
}

/**
 * 获取出场订单
 * @param pmParkId
 * @param carNum
 * @param phone
 * @param inStartDate
 * @param inEndDate
 * @param outStartDate
 * @param outEndDate
 * @param omParkInfoId
 * @param isHasCarNum
 * @param currentPage
 * @returns {AxiosPromise}
 */
export function getOutParkList({ pmParkId, carNum, phone, inStartDate, inEndDate, outStartDate, outEndDate, omParkStandardId, isHasCarNum, currentPage }) {
    return request({
        url: '/tcbstats/orderRest/outParkListForNewMgr',
        method: 'post',
        data: {
            pmParkId, carNum, phone, inStartDate, inEndDate, outStartDate, outEndDate, omParkStandardId, isHasCarNum, currentPage
        }
    })
}

/**
 * 获取出场订单详情
 * @param omParkInfoId
 * @returns {AxiosPromise}
 */
export function getOutParkOrderDetail({ omParkStandardId }) {
    return request({
        url: '/tcbstats/orderRest/outParkOrderDetailForNewMgr',
        method: 'post',
        data: {
            omParkStandardId
        }
    })
}

/**
 * 获取在场订单详情
 * @param omParkInfoId
 * @returns {AxiosPromise}
 */
export function getInParkOrderDetail({ omParkInfoId }) {
    return request({
        url: '/tcbstats/orderRest/inParkOrderDetailForNewMgr',
        method: 'post',
        data: {
            omParkInfoId
        }
    })
}

/**
 * 获取场内支付明细
 * @param orderId
 * @returns {AxiosPromise}
 */
export function getPrepayList({ orderId }) {
    return request({
        url: '/tcbstats/orderRest/prepayListForNewMgr',
        method: 'post',
        data: {
            orderId
        }
    })
}

/**
 * 获取车信息
 * @param carNum
 * @param carNumColor
 * @returns {AxiosPromise}
 */
export function getCarInfo({ carNum, carNumColor }) {
    return request({
        url: '/tcbstats/orderRest/getCarInfo',
        method: 'post',
        data: {
            carNum, carNumColor
        }
    })
}

/**
 * 查询停车订单图片
 * @param omParkStrandrdId
 * @param type
 * @returns {AxiosPromise}
 */
export function queryOrderImages({ omParkStrandrdId, type }) {
    return request({
        url: '/tcbstats/orderRest/orderImgsForNewMgr',
        method: 'post',
        data: {
            omParkStrandrdId, type
        }
    })
}

/**
 * 隐藏在场订单
 * @param omParkInfoId
 * @returns {AxiosPromise}
 */
export function hideInOrder({ omParkInfoId }) {
    return request({
        url: '/tcbstats/orderRest/hideInOrderForNewMgr',
        method: 'post',
        data: {
            omParkInfoId
        }
    })
}

/**
 * 支付宝删单
 * @param omParkInfoId
 * @returns {AxiosPromise}
 */
export function deleteAliOrder({ omParkInfoId }) {
    return request({
        url: '/tcbstats/orderRest/deleteAliOrderForNewMgr',
        method: 'post',
        data: {
            omParkInfoId
        }
    })
}

/**
 * 获取出场订单支付明细
 * @param omParkStandardId
 * @returns {AxiosPromise}
 */
export function getPayOrderList({ omParkStandardId }) {
    return request({
        url: '/tcbstats/refundRest/payOrderListForNewMgr',
        method: 'post',
        data: {
            omParkStandardId
        }
    })
}

/**
 * 修正订单
 * @param omParkStandardId
 * @returns {AxiosPromise}
 */
export function revisedOrder({ omParkStandardId }) {
    return request({
        url: '/tcbstats/orderRest/revisedOrderForNewMgr',
        method: 'post',
        data: {
            omParkStandardId
        }
    })
}

/**
 * 发起退款
 * @param dingdingUserId
 * @param dingdingDeptId
 * @param omParkStandardId
 * @param totalAmount
 * @param refundReason
 * @param remark
 * @param refundDetails
 * @returns {AxiosPromise}
 */
export function applyRefund({ dingdingUserId, dingdingDeptId, omParkStandardId, totalAmount, refundReason, remark, refundDetails }) {
    return request({
        url: '/tcbstats/refundRest/applyRefund',
        method: 'post',
        data: {
            dingdingUserId, dingdingDeptId, omParkStandardId, totalAmount, refundReason, remark, refundDetails
        }
    })
}

/**
 * 获取退款详情
 * @param pmParkId
 * @param carNum
 * @param omParkStandardId
 * @param inStartDate
 * @param inEndDate
 * @param outStartDate
 * @param outEndDate
 * @param approvalStatus
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getRefundList({ pmParkId, carNum, omParkStandardId, inStartDate, inEndDate, outStartDate, outEndDate, approvalStatus, start, limit }) {
    return request({
        url: '/tcbstats/refundRest/refundList',
        method: 'post',
        data: {
            pmParkId, carNum, omParkStandardId, inStartDate, inEndDate, outStartDate, outEndDate, approvalStatus, start, limit
        }
    })
}

/**
 * 获取退款明细数据
 * @param pmRefundInfoId
 * @returns {AxiosPromise}
 */
export function getRefundDetailList({ pmRefundInfoId, start, limit }) {
    return request({
        url: '/tcbstats/refundRest/refundDetailList',
        method: 'post',
        data: {
            pmRefundInfoId, start, limit
        }
    })
}

/**
 * 重新退款
 * @param pmRefundDetailId
 * @returns {AxiosPromise}
 */
export function reTryRefundAmount({ pmRefundDetailId }) {
    return request({
        url: '/tcbstats/refundRest/reTryRefundPay',
        method: 'post',
        data: {
            pmRefundDetailId
        }
    })
}

/**
 * 退款列表数据下载
 * @param pmParkId
 * @param carNum
 * @param omParkStandardId
 * @param inStartDate
 * @param inEndDate
 * @param outStartDate
 * @param outEndDate
 * @param approvalStatus
 * @returns {AxiosPromise}
 */
export function downloadRefundExcel({ pmParkId, carNum, omParkStandardId, inStartDate, inEndDate, outStartDate, outEndDate, approvalStatus }) {
    return request({
        url: '/tcbstats/refundRest/dowloadExcel',
        method: 'post',
        data: {
            pmParkId, carNum, omParkStandardId, inStartDate, inEndDate, outStartDate, outEndDate, approvalStatus
        },
        responseType: 'blob'
    })
}

/**
 * 下载出场订单
 * @param pmParkId
 * @param carNum
 * @param phone
 * @param inStartDate
 * @param inEndDate
 * @param outStartDate
 * @param outEndDate
 * @param omParkInfoId
 * @param isHasCarNum
 * @returns {AxiosPromise}
 */
export function downloadOutOrderExcel({ pmParkId, carNum, phone, inStartDate, inEndDate, outStartDate, outEndDate, omParkStandardId, isHasCarNum }) {
    return request({
        url: '/tcbstats/orderRest/dowloadHistoryExcelForNewMgr',
        method: 'post',
        data: {
            pmParkId, carNum, phone, inStartDate, inEndDate, outStartDate, outEndDate, omParkStandardId, isHasCarNum
        },
        responseType: 'blob'
    })
}

/**
 * 下载在场订单
 * @param pmParkId
 * @param carNum
 * @param phone
 * @param inStartDate
 * @param inEndDate
 * @param omParkInfoId
 * @param isHasCarNum
 * @returns {AxiosPromise}
 */
export function downloadInOrderExcel({ pmParkId, carNum, phone, inStartDate, inEndDate, omParkInfoId, isHasCarNum }) {
    return request({
        url: '/tcbstats/orderRest/dowloadInParkExcelForNewMgr',
        method: 'post',
        data: {
            pmParkId, carNum, phone, inStartDate, inEndDate, omParkInfoId, isHasCarNum
        },
        responseType: 'blob'
    })
}

/**
 * 获取支付方式
 * @returns {AxiosPromise}
 */
export function getPayMethods() {
    return request({
        url: '/parkzip/parkOrder/tpPay/getPayMethods'
    })
}

/**
 * 查询订单
 * @param tradeOrderNo
 * @param merchantOrderNo
 * @param payMethod
 * @returns {AxiosPromise}
 */
export function getOrderList({ tradeOrderNo, payMethod }) {
    return request({
        url: 'parkzip/parkOrder/tpPay/queryOrder',
        params: {
            tradeOrderNo, payMethod
        }
    })
}

/**
 * 退款订单管理：退款驳回
 * @param {*} param0 
 * @returns 
 */
export function refundReject({ pmRefundInfoId }) {
    return request({
        url: '/tcbstats/refundRest/refundReject',
        method: 'post',
        data: {
            pmRefundInfoId
        }
    })
}

/**
 * 获取优惠券统计列表
 * @param {*} param0 
 * @returns 
 */
export function getCouponStatisticsList({ publishId, statStartDt, statEndDt, showCount, currentPage }) {
    return request({
        url: '/parkzip/luckyMoneyStat/page',
        params: {
            publishId, statStartDt, statEndDt, showCount, currentPage, draw: 1
        }
    })
}

/**
 * 获取优惠券汇总查询
 * @param {*} param0 
 * @returns 
 */
export function getCouponStatisticsSummary({ publishId, statStartDt, statEndDt }) {
    return request({
        url: '/parkzip/luckyMoneyStat/summary',
        params: {
            publishId, statStartDt, statEndDt
        }
    })
}

/**
 * 下载优惠券统计列表
 * @param {*} param0 
 * @returns 
 */
export function downloadCouponStatisticsList({ publishId, statStartDt, statEndDt }) {

    let host = location.host;
    if (host !== 'open.tingjiandan.com') {
        host = 'prep.tingjiandan.com';
    }
    let url = `http://${host}/parkzip/luckyMoneyStat/download?publishId=${publishId}&statStartDt=${statStartDt}&statEndDt=${statEndDt}`;

    window.open(url);
}
