import request from '@/utils/request'

/**
 * 获取车道二维码列表
 * @param startDt
 * @param endDt
 * @param start
 * @param limit
 * @returns {AxiosPromise}
 */
export function getLaneQrCodeList({ startDt, endDt, start, limit }) {
  return request({
    url: '/tcqrm/qrmCodeBatch/list',
    method: 'post',
    data: {
      startDt, endDt, start, limit
    }
  })
}

/**
 * 添加二维码批次
 * @param batchNum
 * @param content
 * @returns {AxiosPromise}
 */
export function addQrCodeBatchNum({ batchNum, content }) {
  return request({
    url: '/tcqrm/qrmCodeBatch/add',
    method: 'post',
    data: {
      batchNum, content
    }
  })
}
