import request from '@/utils/request'

/**
 * 获取停车场列表
 * @returns {AxiosPromise}
 */
export function getParkList({ parkName = '', pmParkId = null }) {
  return request({
    url: '/parkapi/parkInfo/parkSelectList',
    params: {
      parkName,
      pmParkId
    }
  })
}

/**
 * 获取所有的省列表
 */
export function getProvince() {
  return request({
    url: '/parkapi/ddRegion/selectProvince'
  });
}

/**
 * 获取下级地区
 * @param regionCode
 */
export function getChildDataByArea({ regionCode }) {
  return request({
    url: `/parkapi/ddRegion/selectChildList/${regionCode}`
  });
}

/**
 * 获取车场列表
 * @param userId
 */
export function getParkListByUser({ userId }) {
  return request({
    url: `/parkapi/dataRole/getParkInfoByUserId/${userId}`
  });
}
