import request from '@/utils/request'

/**
 * 获取监控报警车场
 * @param parkName
 * @param isManage
 * @returns {AxiosPromise}
 */
export function getMonitorAlarmParkList({ parkName, pmParkId, parkCode, isManage, manageStatus, type, orderByColumn, isAsc, pageSize, pageNum }) {
  return request({
    url: '/pwm-service/wmpark/list',
    params: {
      parkName, pmParkId, parkCode, isManage, manageStatus, type, orderByColumn, isAsc, pageSize, pageNum
    }
  })
}

/**
 * 新增监控报警车场
 * @param isManage
 * @param manageStatus
 * @param type
 * @param operateDesc
 * @param changeDesc
 * @returns {AxiosPromise}
 */
export function addMonitorAlarmPark({ isManage, manageStatus, pmParkId, parkName, type, operateDesc, changeDesc }) {
  return request({
    url: '/pwm-service/wmpark',
    method: 'post',
    data: {
      isManage, manageStatus, pmParkId, parkName, type, operateDesc, changeDesc
    }
  })
}

/**
 * 修改监控报警车场
 * @param sManage
 * @param operateDesc
 * @param wmParkId
 * @returns {AxiosPromise}
 */
export function updateMonitorAlarmPark({ isManage, manageStatus, type, operateDesc, changeDesc, wmParkId, pmParkId, parkName }) {
  return request({
    url: '/pwm-service/wmpark',
    method: 'put',
    data: {
      isManage, manageStatus, type, operateDesc, changeDesc, wmParkId, pmParkId, parkName
    }
  })
}

/**
 * 监控报警车场日志
 * @param wmParkId
 * @param pageSize
 * @param pageNum
 * @returns {AxiosPromise}
 */
export function getMonitorAlarmParkLog({ wmParkId, type, pageSize, pageNum, orderByColumn, isAsc }) {
  return request({
    url: '/pwm-service/wmParkLog/list',
    params: {
      wmParkId, type, pageSize, pageNum, orderByColumn, isAsc
    }
  })
}

/**
 * 导出
 * @param params
 * @returns {AxiosPromise}
 */
export function exportMonitorAlarmParkList(params) {
  return request({
    url: '/pwm-service/wmpark/exportMonitor',
    params
  })
}

/**
 * 导出
 * @param params
 * @returns {AxiosPromise}
 */
export function exportMonitorAlarmParkLog(params) {
  return request({
    url: '/pwm-service/wmParkLog/operateExport',
    params
  })
}

export function exportOpenParkState(params) {
  return request({
    url: '/pwm-service/wmpark/exportAll',
    params
  })
}

export function exportOpenParkStateLog(params) {
  return request({
    url: '/pwm-service/wmParkLog/changeExport',
    params
  })
}

/**
 * 获取详情
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function getMonitorDetail({ pmParkId }) {
  return request({
    url: `/pwm-service/wmpark/getInfoByParkId/${pmParkId}`
  })
}

/**
 * 获取运行状态
 * @param pmParkId
 * @returns {AxiosPromise}
 */
export function getRunningState({ pmParkId }) {
  return request({
    url: `/pwm-service/chart/getParkChart/${pmParkId}`
  })
}

/**
 * 导出图表数据
 * @param pmParkId
 * @param type
 * @returns {AxiosPromise}
 */
export function exportChartData({ pmParkId, type }) {
  return request({
    url: '/pwm-service/chart/exportCharData',
    params: {
      pmParkId, type
    }
  })
}

export function syncLocalEntrance({ pmParkId }) {
  return request({
    url: `/parkapi/config/exit/exitsManualSycn/${pmParkId}`,
  })
}

export function syncLocalCashier({ pmParkId }) {
  return request({
    url: `/parkapi/config/exit/gmUsersManualSycn/${pmParkId}`,
  })
}
