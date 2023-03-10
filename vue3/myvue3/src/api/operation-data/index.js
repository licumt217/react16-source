import request from '@/utils/request'

/**
 * 售卖统计查询
 * @param {*} param0 
 * @returns 
 */
export function queryReport({ goodsId, reportStart, reportEnd, pageNum, pageSize }) {
    return request({
        method: 'post',
        url: '/shop/vip/queryReport',
        data: {
            goodsId, reportStart, reportEnd, pageNum, pageSize
        }
    })
}


/**
 * 导出EXcel
 * @param {*} param0 
 * @returns 
 */
export function downloadReport({ goodsId, reportStart, reportEnd }) {
    return request({
        method: 'post',
        url: '/shop/vip/downloadReport',
        data: {
            goodsId, reportStart, reportEnd
        }
    })
}

/**
 * 分页查询统计记录对应的订单列表
 * @param {*} param0 
 * @returns 
 */
export function getReportOrders({ id, pageNum, pageSize }) {
    return request({
        method: 'post',
        url: `/shop/vip/getReportOrders/${id}?pageNum=${pageNum}&pageSize=${pageSize}`,
        data: {
            pageNum, pageSize
        }
    })
}



/**
 * 订单列表excel导出
 * @param {*} param0 
 * @returns 
 */
export function downloadReportOrders({ id }) {
    return request({
        method: 'post',
        url: `/shop/vip/downloadReportOrders/${id}`,
    })
}

/**
 * 查询会员权益明细
 * @param {*} param0 
 * @returns 
 */
export function getReport({ id }) {
    return request({
        method: 'get',
        url: `/shop/vip/getReport/${id}`,
    })
}

