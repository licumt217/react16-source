import request from '@/utils/request'

/**
 * 查询客服反馈记录
 * @param {*} param0
 * @returns
 */
export function feedbackPageQuery(data) {
    return request({
        url: `/cpaynote/feedback/pageQuery`,
        method: 'post',
        data: {...data}
    })
}

/**
 * 导出客服反馈记录
 * @param {*} param0
 * @returns
 */
export function feedbackExport(data) {
    return request({
        url: `/cpaynote/feedback/export`,
        method: 'post',
        data: {...data}
    })
}
/**
 * 根据ID查询记录详情
 * @param {*} param0
 * @returns
 */
export function feedbackGetDetailById(id) {
    return request({
        url: `/cpaynote/feedback/getById/${id}`,
    })
}
/**
 * 客服处理
 * @param {*} param0
 * @returns
 */
export function feedbackAction(data) {
    return request({
        url: `/cpaynote/feedback/action`,
        method: 'post',
        data: {...data}
    })
}
