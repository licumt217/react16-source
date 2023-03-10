import request from '@/utils/request'

/**
 * 车联网报表生成
 * @param platform
 * @param startDt
 * @param endDt
 * @param statType
 * @param email
 * @returns {AxiosPromise}
 */
export function generateCarNetworkingReport({ platform, startDt, endDt, statType, email }) {
  return request({
    url: '/parkzip/ioVReport/generateReport',
    params: {
      platform,
      startDt,
      endDt,
      statType,
      email
    }
  });
}
